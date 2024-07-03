import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./constants";
import { Analytics, getAnalytics } from "firebase/analytics";

const app = initializeApp(firebaseConfig);
const analytics : Analytics = getAnalytics(app);
export { analytics };