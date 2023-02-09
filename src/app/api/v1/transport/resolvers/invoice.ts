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
      rate: costItem.item.rate.toString(),
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
  currency: invoice.currency,
});

export default {
  Query: {
    invoices: async (_, { args }, context) => {
      const { data, total, cursor } = await InvoiceService.listInvoices(
        context,
        context.repository.invoice,
        {
          limit: args?.limit,
          cursor: args?.cursor,
        },
      );

      return {
        data: data.map((invoice) => mapInvoice(invoice)),
        total,
        cursor,
      };
    },
    invoice: async (_, args, context) => {
      const invoice = await InvoiceService.retrieveInvoice(
        context,
        context.repository.invoice,
        args.id,
      );

      return mapInvoice(invoice);
    },
  } as Pick<graphqlTypes.QueryResolvers<Context>, 'invoices' | 'invoice'>,
  Invoice: {
    recipient: async (invoice, _, context) => {
      const { recipient } = await InvoiceService.retrieveInvoiceParties(
        context,
        context.repository.invoice,
        context.repository.company,
        invoice.id,
      );

      return recipient;
    },
    issuer: async (invoice, _, context) => {
      const { issuer } = await InvoiceService.retrieveInvoiceParties(
        context,
        context.repository.invoice,
        context.repository.company,
        invoice.id,
      );

      return issuer;
    },
    phases: async (invoice, _, context) => {
      const phases = await PhaseService.retrievePhasesForInvoice(
        context,
        context.repository.phase,
        invoice.id,
      );

      return phases.map((phase) => mapPhase(phase));
    },
  } as graphqlTypes.InvoiceResolvers<Context>,
};
