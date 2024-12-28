import React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface Item {
  value: string;
  label: string;
  image: string;
}

interface ItemSelectorProps {
  items: Item[];
  selectedItem: string;
  onItemSelect: (value: string) => void;
  isWireframe: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ItemSelector: React.FC<ItemSelectorProps> = ({
  items,
  selectedItem,
  onItemSelect,
  isWireframe,
  open,
  setOpen
}) => {
  const wireframeStyles = isWireframe ? {
    input: "border-2 border-dashed border-black bg-white",
    label: "font-mono text-black",
  } : {
    input: "",
    label: "",
  };

  const selectedItemData = items.find((item) => item.value === selectedItem);

  return (
    <div className="space-y-2 animate-fade-in">
      <div className="bg-accent/50 p-4 rounded-lg border-2 border-accent shadow-lg transition-all duration-300 highlight-pulse">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <Label className={`${wireframeStyles.label} text-lg font-semibold mb-2 block`}>
              Confirm Item Type
            </Label>
            <p className="text-sm text-gray-600 mb-4">
              We've detected your item. Please confirm if this is correct or select a different item from the list.
            </p>
          </div>
          
          {selectedItemData && (
            <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-accent flex items-center justify-center bg-white shrink-0">
              <img 
                src={selectedItemData.image} 
                alt={selectedItemData.label}
                className="w-28 h-28 object-contain"
              />
            </div>
          )}
        </div>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={`w-full justify-between ${wireframeStyles.input} border-2 border-primary/30 hover:border-primary/50 transition-colors`}
            >
              {selectedItem
                ? items.find((item) => item.value === selectedItem)?.label
                : "Select an item..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
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
                        onItemSelect(currentValue === selectedItem ? "" : currentValue);
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
                            selectedItem === item.value ? "opacity-100" : "opacity-0"
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
    </div>
  );
};

export default ItemSelector;