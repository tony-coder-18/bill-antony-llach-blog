import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Blog Posts')
        .child(
          S.documentTypeList('post')
            .title('Blog Posts')
            .filter('_type == "post" && category == $category')
            .params({category: 'blog'}),
        ),
      S.listItem()
        .title('Projects')
        .child(
          S.documentTypeList('post')
            .title('Projects')
            .filter('_type == "post" && category == $category')
            .params({category: 'projects'}),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => item.getId() !== 'post'),
    ])
