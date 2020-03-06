const filterByTerm = require('../index')
/*.spec 用于将文件标记为给定功能的规范。*/

describe("Filter function", () => {
  /* test stuff */
  test("测试filterByTerm是否符合", () => {
    /* actual test */
    const input = [
      { id: 1, url: "https://www.url1.dev" },
      { id: 2, url: "https://www.url2.dev" },
      { id: 3, url: "https://www.link3.dev" }
    ];

    const output = [{ id: 3, url: "https://www.link3.dev" }];

    expect(filterByTerm(input, "link")).toEqual(output);

    expect(filterByTerm(input, "LINK")).toEqual(output);

    expect(filterByTerm(input, "LINK")).toEqual(output);
    
  })
})