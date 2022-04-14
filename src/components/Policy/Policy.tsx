const Policy = () => {
  // React.useEffect(() => {
  //     document.getElementById("policy-wrapper")?.load()
  // }, [])
  return (
    // <div id="policy-wrapper">

    // </div>
    <iframe
      src="./files/policy.html"
      seamless
      style={{
        width: "100%",
        height: "100vh",
        border: "none",
      }}
    />
  );
};

export default Policy;
