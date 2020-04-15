export default {
  data () {
    return {
      pageCurrent: 1,
      pageTotal: 0,
      pageData: []
    };
  },
  methods: {
    getPageData ({ target, data = {} }) {
      if (!target) return console.error('target 必须是一个Promise对象');
      const param = { page: this.pageCurrent };
      data = { ...data, ...param };
      return target(data).then(({ data }) => {
        this.pageData.push(...data.data);
        this.pageTotal = data.page.total_page;
        return Promise.resolve(data);
      });
    },
    resetPageData () {
      this.pageCurrent = 1;
      this.pageData = [];
    }
  }
};
