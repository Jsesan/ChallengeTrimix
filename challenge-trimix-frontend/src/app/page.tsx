import PersonaTable from "@/components/PersonaTable";
import FilterControls from "../components/FilterControls";

export default function Home() {
  return (
    <div className="page-container">
      <FilterControls />
      <PersonaTable />
    </div>
  );
}
