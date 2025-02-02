"use client"

import { useState } from "react"
import { Pencil, Trash, Plus } from "lucide-react"
import Image from "next/image"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type Chef = {
  name: string
  position: string
  experience: number
  specialty: string
  image: string
  description: string
  available: boolean
}

const initialChefs: Chef[] = [
  {
    name: "Tahmina Rumi",
    position: "Head Chef",
    experience: 12,
    specialty: "Italian Cuisine",
    image: "/chef/r1.png",
    description: "Expert in crafting authentic Italian dishes and pastries.",
    available: true,
  },
  {
    name: "Jorina Begum",
    position: "Sous Chef",
    experience: 8,
    specialty: "Pastry and Desserts",
    image: "/chef/r2.png",
    description: "Specializes in creative pastries and dessert innovations.",
    available: true,
  },
  {
    name: "M. Mohammad",
    position: "Grill Master",
    experience: 10,
    specialty: "Grilled Dishes",
    image: "/chef/r3.png",
    description: "Renowned for creating perfectly grilled meats and vegetables.",
    available: true,
  },
  {
    name: "Martin Kathy",
    position: "Culinary Instructor",
    experience: 15,
    specialty: "Asian Fusion",
    image: "/chef/r4.png",
    description: "Pioneer in Asian fusion dishes blending traditional flavors with modern techniques.",
    available: true,
  },
  {
    name: "Tahmina Rumi",
    position: "Asian Food Expert",
    experience: 15,
    specialty: "Asian Fusion",
    image: "/chef/r5.png",
    description: "Pioneer in Asian fusion dishes blending traditional flavors with modern techniques.",
    available: true,
  },
  {
    name: "Bisnu Bengol",
    position: "Executive Chef",
    experience: 20,
    specialty: "Global Cuisine",
    image: "/chef/r6.png",
    description: "Expert in international cuisines and menu planning.",
    available: true,
  },
  {
    name: "Mottin Mollahd",
    position: "Culinary Specialist",
    experience: 18,
    specialty: "Main Course Specialist",
    image: "/chef/r7.png",
    description: "Craft delicious dishes and curate memorable dining experiences with passion and precision.",
    available: true,
  },
  {
    name: "William Rumi",
    position: "Chef de Cuisine",
    experience: 8,
    specialty: "Seafood Specialties",
    image: "/chef/r8.png",
    description: "Master of crafting exquisite seafood dishes with unique flavors.",
    available: true,
  },
  {
    name: "Kate William Roy",
    position: "Kitchen Maestro",
    experience: 14,
    specialty: "Culinary Expert",
    image: "/chef/r9.png",
    description: "Create culinary masterpieces and lead the kitchen with creativity and expertise.",
    available: true,
  },
  {
    name: "Mahmud kholi",
    position: "Culinary Artist",
    experience: 15,
    specialty: "Culinary Expert",
    image: "/chef/r10.png",
    description: "Design and prepare exquisite dishes that delight the senses and elevate dining experiences.",
    available: true,
  },
  {
    name: "Altair Rahman",
    position: "Dishes Specialist",
    experience: 12,
    specialty: "Dishes Specialist",
    image: "/chef/r11.png",
    description: "Ensure spotless, organized dishware and maintain kitchen cleanliness to support seamless operations.",
    available: true,
  },
  {
    name: "Mostaba holly",
    position: "Dessert Specialist",
    experience: 17,
    specialty: "Desserts",
    image: "/chef/r12.png",
    description: "Craft delectable desserts and sweet treats, adding a perfect finishing touch to every meal.",
    available: true,
  },
]

export function ChefsTable() {
  const [chefs, setChefs] = useState<Chef[]>(initialChefs)
  const [chefToDelete, setChefToDelete] = useState<Chef | null>(null)
  const [newChef, setNewChef] = useState<Chef>({
    name: "",
    position: "",
    experience: 0,
    specialty: "",
    image: "/placeholder.svg",
    description: "",
    available: true,
  })

  const toggleAvailability = (chefName: string) => {
    setChefs(chefs.map((chef) => (chef.name === chefName ? { ...chef, available: !chef.available } : chef)))
  }

  const deleteChef = (chef: Chef) => {
    setChefToDelete(chef)
  }

  const confirmDelete = () => {
    if (chefToDelete) {
      setChefs(chefs.filter((chef) => chef.name !== chefToDelete.name))
      setChefToDelete(null)
    }
  }

  const handleNewChefChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    setNewChef((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }))
  }

  const handleNewChefAvailability = (checked: boolean) => {
    setNewChef((prev) => ({ ...prev, available: checked }))
  }

  const addNewChef = () => {
    setChefs((prev) => [...prev, newChef])
    setNewChef({
      name: "",
      position: "",
      experience: 0,
      specialty: "",
      image: "/placeholder.svg",
      description: "",
      available: true,
    })
  }

  return (
    <div className="space-y-4">
      <Dialog>
        <DialogTrigger asChild>
        <div className="flex justify-end">
          <Button>
            <Plus className="mr-2 h-4 w-4 " /> Add New Chef
          </Button>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Chef</DialogTitle>
            <DialogDescription>Enter the details of the new chef here. Click save when you're done.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" name="name" value={newChef.name} onChange={handleNewChefChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="position" className="text-right">
                Position
              </Label>
              <Input
                id="position"
                name="position"
                value={newChef.position}
                onChange={handleNewChefChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="experience" className="text-right">
                Experience
              </Label>
              <Input
                id="experience"
                name="experience"
                type="number"
                value={newChef.experience}
                onChange={handleNewChefChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="specialty" className="text-right">
                Specialty
              </Label>
              <Input
                id="specialty"
                name="specialty"
                value={newChef.specialty}
                onChange={handleNewChefChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image URL
              </Label>
              <Input
                id="image"
                name="image"
                value={newChef.image}
                onChange={handleNewChefChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                value={newChef.description}
                onChange={handleNewChefChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="available" className="text-right">
                Available
              </Label>
              <Switch id="available" checked={newChef.available} onCheckedChange={handleNewChefAvailability} />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={addNewChef}>
              Save chef
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Chef</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Specialty</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {chefs.map((chef) => (
              <TableRow key={chef.name}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden">
                      <Image src={chef.image || "/placeholder.svg"} alt={chef.name} fill className="object-cover" />
                    </div>
                    <div>
                      <div className="font-medium">{chef.name}</div>
                      <div className="text-sm text-muted-foreground line-clamp-1">{chef.description}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{chef.position}</TableCell>
                <TableCell>{chef.specialty}</TableCell>
                <TableCell>{chef.experience} years</TableCell>
                <TableCell>
                  <Badge variant={chef.available ? "default" : "destructive"}>
                    {chef.available ? "Available" : "Unavailable"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button size="icon" variant="ghost">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => deleteChef(chef)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => toggleAvailability(chef.name)}>
                      {chef.available ? "Mark Unavailable" : "Mark Available"}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!chefToDelete} onOpenChange={() => setChefToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this chef?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the chef from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

