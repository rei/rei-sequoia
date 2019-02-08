module.exports = async (page, scenario, vp) => {
  console.log('SCENARIO > ' + scenario.label);
  await require('./clickAndHoverHelper')(page, scenario);

  if(scenario.isTest) {
    // Add font declarations here. Note that they need to be installed on your machine for the local() to work.
    
    page.addStyleTag({
      content: `@font-face {
  font-family: "Sentinel-Semibold";
  src: local(REIStuartBETA-Semibold);
}
@font-face {
  font-family: "Sentinel";
  font-weight: 600;
  src: local(REIStuartBETA-Semibold);
}
@font-face {
  font-family: "Roboto";
  src: local(Graphik-Regular);
}
@font-face {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 600;
  src: local(Graphik-Bold);
}
@font-face {
  font-family: "Roboto Condensed";
  src: local(GraphikCond-Regular);
}
@font-face {
  font-family: "Plak Black";
  src: local(REIStuardBETA-Bold)
}`
    })
  }

  // add more ready handlers here...
};
