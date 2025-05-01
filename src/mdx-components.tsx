import type { MDXComponents } from "mdx/types";
import {
  BlockQuote,
  CalloutComponent,
  CodeComponent,
  H1,
  H2,
  H3,
  HorizontalRule,
  ImageComponent,
  LinkComponent,
  ListItemComponent,
  OrderedList,
  Paragraph,
  PreComponent,
  TableComponent,
  TableDataCell,
  TableHeaderCell,
  UnorderedList,
} from "./components/mdx-components";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: H1,
    h2: H2,
    h3: H3,
    p: Paragraph,
    ul: UnorderedList,
    ol: OrderedList,
    li: ListItemComponent,
    blockquote: BlockQuote,
    a: LinkComponent,
    pre: PreComponent,
    code: CodeComponent,
    table: TableComponent,
    th: TableHeaderCell,
    td: TableDataCell,
    hr: HorizontalRule,
    img: ImageComponent,
    Callout: CalloutComponent,
  };
}
