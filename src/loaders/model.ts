export default (): { name: string; model }[] => {
  const modelsList: { name: string; model }[] = [
    {
      name: "urlModel",
      model: require("../models/url").default,
    },
  ];
  return modelsList;
};
