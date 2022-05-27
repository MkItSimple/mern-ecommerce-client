

import { VariantType } from "../types";
import { VariantsTableStyles } from "./VariantsTableStyles"

const VariantsTable = ({tableData, keyword}: {tableData: any[], keyword: string}) => {
  const searched = (keyword: string) => (item: VariantType) => item.name.toLowerCase().includes(keyword);
  return (
    <VariantsTableStyles>
        
    </VariantsTableStyles>
  )
}

export default VariantsTable