import { useState } from "react";
import BusinessNameContext from "./BusinessNameContext";
import Homepage from "./HomePage";
import { RecoilRoot } from "recoil";

function Ap() {
  const [businessName, setBusinessName] = useState("dune");
  return (
    <div>
      <RecoilRoot>
        <BusinessNameContext.Provider value={{ businessName, setBusinessName }}>
          <Homepage />
        </BusinessNameContext.Provider>
      </RecoilRoot>
    </div>
  );
}

export default Ap;
