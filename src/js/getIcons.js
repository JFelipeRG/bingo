import { library, icon, findIconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faDisplay, faUser } from "@fortawesome/free-solid-svg-icons";

// Add icons
library.add(faDisplay, faUser);

const displayIcon = () => {
  const display = findIconDefinition({ prefix: "fas", iconName: "display" });
  const i = icon(display);

  return i;
};

const userIcon = () => {
  const user = findIconDefinition({ prefix: "fas", iconName: "user" });
  const i = icon(user);

  return i;
};

export { userIcon, displayIcon };
