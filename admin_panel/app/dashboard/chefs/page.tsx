import { ChefsTable } from "@/components/chefs-table"

export default function ChefsPage() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Chefs Management</h2>
      </div>
      <ChefsTable />
    </div>
  )
}

