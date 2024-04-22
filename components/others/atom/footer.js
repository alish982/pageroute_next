import { businessNameState } from "./atoms";
import { useRecoilValue } from "recoil";

const Footer = () => {
  const businessName = useRecoilValue(businessNameState);
  return <div> footer {businessName}</div>;
};

export default Footer;
