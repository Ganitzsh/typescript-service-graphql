import { Invoice, InvoiceService } from '../../domain/invoice';
import {
  Modifier,
  ModifierCategory,
  ModifierType,
} from '../../domain/modifier/type';
import { PhaseService } from '../../domain/phase';
import { ItemType, Phase, TaxRate } from '../../domain/phase/type';

import * as graphqlTypes from '../schema/codegen';
import { Context } from '../context';

const mapTaxRate: Record<TaxRate, graphqlTypes.TaxRate> = {
  [TaxRate.None]: graphqlTypes.TaxRate.None,
  [TaxRate.Low]: graphqlTypes.TaxRate.Low,
  [TaxRate.Standard]: graphqlTypes.TaxRate.Standard,
};
const mapItemType: Record<ItemType, graphqlTypes.ItemType> = {
  [ItemType.PerHour]: graphqlTypes.ItemType.PerHour,
  [ItemType.Quantity]: graphqlTypes.ItemType.Quantity,
};
const mapModifierType: Record<ModifierType, graphqlTypes.ModifierType> = {
  [ModifierType.Amount]: graphqlTypes.ModifierType.Amount,
};
const mapModifierCategory: Record<
  ModifierCategory,
  graphqlTypes.ModifierCategory
> = {
  [ModifierCategory.Fee]: graphqlTypes.ModifierCategory.Fee,
  [ModifierCategory.Discount]: graphqlTypes.ModifierCategory.Discount,
};

const mapModifier = (modifier: Modifier): graphqlTypes.Modifier => ({
  __typename: 'Modifier',
  type: mapModifierType[modifier.type],
  category: mapModifierCategory[modifier.category],
  value: modifier.value.toString(),
});

const mapPhase = (phase: Phase): graphqlTypes.Phase => ({
  __typename: 'Phase',
  ...phase,
  items: phase.items.map((costItem) => ({
    ...costItem,
    item: {
      ...costItem.item,
      taxRate: mapTaxRate[costItem.item.taxRate],
      type: mapItemType[costItem.item.type],
    },
    quantity: costItem.quantity.toString(),
    total: costItem.total.toString(),
    subtotal: costItem.subtotal.toString(),
  })),
  modifier: phase.modifier ? mapModifier(phase.modifier) : undefined,
  total: phase.total.toString(),
  subtotal: phase.subtotal.toString(),
});

const mapInvoice = (invoice: Invoice): graphqlTypes.Invoice => ({
  __typename: 'Invoice',
  id: invoice.id,
  modifier: invoice.modifier ? mapModifier(invoice.modifier) : undefined,
  phases: [],
  total: invoice.total.toString(),
  subtotal: invoice.subtotal.toString(),
});

export default {
  Query: {
    invoices: async (_, { args }) => {
      const { data, cursor } = await InvoiceService.listInvoices({
        limit: args?.limit,
        cursor: args?.cursor,
      });

      return {
        data: data.map((invoice) => mapInvoice(invoice)),
        cursor,
      };
    },
    invoice: async (_, args) => {
      const invoice = await InvoiceService.retrieveInvoice(args.id);

      return mapInvoice(invoice);
    },
  } as Pick<graphqlTypes.QueryResolvers<Context>, 'invoices' | 'invoice'>,
  Invoice: {
    phases: async (invoice) => {
      const phases = await PhaseService.retrievePhases(invoice.id);

      return phases.map((phase) => mapPhase(phase));
    },
  } as graphqlTypes.InvoiceResolvers<Context>,
};
