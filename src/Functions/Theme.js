export const theme = {
  name: "my-theme",
  overrides: [
    {
      colorMode: "dark",
      tokens: {
        colors: {
          font: {
            primary: { value: "#f7f5ef" },
            secondary: { value: "#f7f5ef" },
          },
          background: {
            primary: { value: "#404040" },
          },
        },
        components: {
          button: {
            primary: {
              backgroundColor: { value: "#008080" },
              _hover: {
                borderColor: { value: "#f7f5ef" },
              },
            },
          },
          togglebutton: {
            _pressed: {
              borderColor: { value: "#f7f5ef" },
              backgroundColor: { value: "#008080" },
            },
            _focus: {
              borderColor: { value: "#f7f5ef" },
              backgroundColor: { value: "#008080" },
            },
          },
          badge: {
            color: { value: "#f7f5ef" },
            backgroundColor: { value: "#008080" },
          },
          table: {
            row: {
              hover: {
                backgroundColor: { value: "rgba(255, 255, 255, 0.2)" },
              },

              striped: {
                backgroundColor: { value: "#303030" },
              },
            },
          },
        },
      },
    },
    {
      colorMode: "light",
      tokens: {
        colors: {
          font: {
            primary: { value: "#000" },
            secondary: { value: "#000" },
          },
          background: {
            primary: { value: "#f7f5ef" },
          },
        },
        components: {
          button: {
            primary: {
              backgroundColor: { value: "#008080" },
              _hover: {
                borderColor: { value: "#f7f5ef" },
              },
            },
          },
          togglebutton: {
            _pressed: {
              borderColor: { value: "#000" },
              backgroundColor: { value: "#008080" },
            },
            _focus: {
              borderColor: { value: "#000" },
              backgroundColor: { value: "#008080" },
            },
          },
          badge: {
            color: { value: "#f7f5ef" },
            backgroundColor: { value: "#008080" },
          },
          table: {
            row: {
              hover: {
                backgroundColor: { value: "rgba(0, 0, 0, 0.2)" },
              },

              striped: {
                backgroundColor: { value: "rgb(219, 217, 217)" },
              },
            },
          },
        },
      },
    },
  ],
};
