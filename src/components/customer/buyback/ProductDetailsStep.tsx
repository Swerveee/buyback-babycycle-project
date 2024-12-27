import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ProductDetailsStepProps {
  onSubmit: (data: any) => void;
  isWireframe: boolean;
}

const items = [
  { value: "onesie", label: "Organic Cotton Onesie", image: "/placeholder.svg" },
  { value: "blanket", label: "Baby Soft Blanket", image: "/placeholder.svg" },
  { value: "sleepsack", label: "Sleep Sack", image: "/placeholder.svg" },
  { value: "romper", label: "Baby Romper Set", image: "/placeholder.svg" },
  { value: "hat", label: "Newborn Hat Pack", image: "/placeholder.svg" },
  { value: "socks", label: "Baby Socks Bundle", image: "/placeholder.svg" },
];

const ProductDetailsStep: React.FC<ProductDetailsStepProps> = ({ onSubmit, isWireframe }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  const wireframeStyles = isWireframe ? {
    input: "border-2 border-dashed border-gray-300 bg-white",
    label: "font-mono",
    select: "border-2 border-dashed border-gray-300 bg-white"
  } : {
    input: "",
    label: "",
    select: ""
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label className={wireframeStyles.label}>Product Category</Label>
        <Select defaultValue="clothing">
          <SelectTrigger className={wireframeStyles.select}>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="clothing">Baby Clothing</SelectItem>
            <SelectItem value="toys">Toys</SelectItem>
            <SelectItem value="gear">Baby Gear</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className={wireframeStyles.label}>Previously Purchased Item</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={`w-full justify-between ${wireframeStyles.input}`}
            >
              {value
                ? items.find((item) => item.value === value)?.label
                : "Select an item..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <Command>
              <CommandInput placeholder="Search items..." />
              <CommandList>
                <CommandEmpty>No item found.</CommandEmpty>
                <CommandGroup heading="Suggested items">
                  {items.map((item) => (
                    <CommandItem
                      key={item.value}
                      value={item.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-2"
                    >
                      <div className={`w-10 h-10 ${isWireframe ? "border-2 border-dashed border-gray-300" : "bg-gray-100"} rounded-md flex items-center justify-center`}>
                        <img 
                          src={item.image}
                          alt={item.label}
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Check
                          className={cn(
                            "h-4 w-4",
                            value === item.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {item.label}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label className={wireframeStyles.label}>Age Range</Label>
        <Select defaultValue="0-6m">
          <SelectTrigger className={wireframeStyles.select}>
            <SelectValue placeholder="Select age range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-6m">0-6 months</SelectItem>
            <SelectItem value="6-12m">6-12 months</SelectItem>
            <SelectItem value="1-2y">1-2 years</SelectItem>
            <SelectItem value="2-3y">2-3 years</SelectItem>
            <SelectItem value="3-4y">3-4 years</SelectItem>
            <SelectItem value="4-5y">4-5 years</SelectItem>
            <SelectItem value="5+">5+ years</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className={wireframeStyles.label}>Original Purchase Date</Label>
        <Input 
          type="date" 
          required 
          className={wireframeStyles.input}
        />
      </div>
    </form>
  );
};

export default ProductDetailsStep;