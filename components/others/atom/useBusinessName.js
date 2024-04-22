import { useRecoilState } from "recoil";
import { miniBar } from "./atoms";

const useBusinessName = () => {
  const [businessName, setBusinessName] = useRecoilState(miniBar);

  return { businessName, setBusinessName };
};

export default useBusinessName;
