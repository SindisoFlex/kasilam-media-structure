// Minimal type surface for frontend (TS) consumers.
// Hand-written to avoid a build pipeline; keep in sync with index.js.

export type ServiceCategory = "visual" | "audio" | "digital";

export interface ServiceDef {
  code: string;
  label: string;
  category: ServiceCategory;
  bookingService: string;
  legacyIds: string[];
  route: string;
}

export interface PackageDef {
  code: string;
  tier: string;
  prices: {
    photo?: number;
    video?: number;
    both?: number;
    from?: number;
    fromPlus?: number;
  };
}

export interface AddonDef {
  id: string;
  name: string;
  price: number;
}

export const SERVICES: Readonly<Record<string, ServiceDef>>;
export const SERVICE_CODES: ReadonlyArray<string>;
export const PACKAGES: Readonly<Record<string, ReadonlyArray<PackageDef>>>;
export const PRICE_FROM: Readonly<Record<string, { photo: number; video: number; both: number }>>;
export const ADDONS: Readonly<Record<ServiceCategory, ReadonlyArray<AddonDef>>>;

export function formatTierLine(pkg: PackageDef): string;
export function formatFromLine(pkg: PackageDef): string;
export function exactPricingLines(serviceCode: string): string[];
export function startsFromBlurb(serviceCode: string, noun: string): string | null;
export function webStartsFromBlurb(): string;
export function resolveServiceCode(input: string | null | undefined): string | null;
export function resolvePackageCode(serviceCode: string, input: string): string | null;
export function getServiceByCode(code: string | null | undefined): ServiceDef | null;
