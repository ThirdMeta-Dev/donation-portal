export interface CmsPage {
  id: string;
  slug: string;
  name: string;
  created_at: string;
}

export interface CmsSection {
  id: string;
  page_id: string;
  component_name: string;
  display_name: string;
  display_order: number;
  enabled: boolean;
  content: Record<string, unknown>;
  environment: "staging" | "production";
  created_at: string;
  updated_at: string;
}

export interface CmsCarouselItem {
  id: string;
  section_id: string;
  item_order: number;
  content: Record<string, unknown>;
  environment: "staging" | "production";
  created_at: string;
}

export type FieldType = "text" | "textarea" | "url" | "image" | "video" | "number" | "link";

/** Resolves a CMS link value (possibly prefixed) to a usable href. */
export function resolveCmsLink(value: string | undefined): string {
  if (!value) return "#";
  if (value.startsWith("page:")) return value.slice(5);
  if (value.startsWith("external:")) return value.slice(9);
  if (value.startsWith("anchor:")) return `#${value.slice(7)}`;
  return value; // plain URL/path — backward compatible
}

export interface ContentField {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
}

export interface SectionSchema {
  fields: ContentField[];
  defaultContent?: Record<string, unknown>;
  isCarousel?: boolean;
  carouselLabel?: string;
  defaultItems?: Record<string, unknown>[];
  itemFields?: ContentField[];
}

export type AppEnvironment = "staging" | "production";
