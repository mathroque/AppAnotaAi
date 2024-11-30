import { createContext } from "react";
import { ItemsType } from "../Types/Item";

export const ListContext = createContext({
    listContext: [{ name: "produto 1", value: 45 }],
    setListContext: (list: ItemsType[]) => {},
});
