import "bootstrap/js/tooltip";

export default function (options) {
  options = options || {};
  return {
    componentDidMount() {
      this.attachTooltips();
    },

    componentWillUnmount() {
      this.removeTooltips();
      $(this.getDOMNode()).unbind();
    },

    attachTooltips() {
      $(this.getDOMNode()).tooltip(
        Object.prototype.toString.call(options) === '[object Function]' ?
          options.call(this) : options
      );
    },

    removeTooltips() {
      $(this.getDOMNode()).tooltip("destroy");
    }
  };
}