export const theme = {
  name: "my-theme",
  overrides: [
    {
      colorMode: "dark",
      tokens: {
        colors: {
          font: {
            primary: { value: "#fff" },
            secondary: { value: "#fff" },
          },
          background: {
            primary: { value: "#404040" },
          },
        },
        components: {
          button: {
            primary: {
              _hover: {
                borderColor: { value: "#fff" },
              },
            },
          },
          togglebutton: {
            _pressed: {
              borderColor: { value: "#fff" },
            },
            _focus: {
              borderColor: { value: "#fff" },
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
            primary: { value: "#f9f1f1" },
          },
        },
        components: {
          button: {
            primary: {
              _hover: {
                borderColor: { value: "#000" },
              },
            },
          },
          togglebutton: {
            _pressed: {
              borderColor: { value: "#000" },
            },
            _focus: {
              borderColor: { value: "#000" },
            },
          },
          table: {
            borderColor: { value: "#000" }
          }
        },
      },
    },
  ],
};
