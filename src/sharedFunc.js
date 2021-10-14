export const parseCat = categories =>
  categories?.reduce((acc, cur, index) => {
    if (index === 0) {
      return `${cur?.name}`;
    } else {
      return `${acc}, ${cur?.name}`;
    }
  }, "");
