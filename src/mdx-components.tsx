import type { MDXComponents } from "mdx/types";
import {
  H1,
  H2,
  H3,
  Paragraph,
  UnorderedList,
  OrderedList,
  ListItemComponent,
  BlockQuote,
  LinkComponent,
  PreComponent,
  CodeComponent,
  TableComponent,
  TableHeaderCell,
  TableDataCell,
  HorizontalRule,
  ImageComponent,
  CalloutComponent
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
