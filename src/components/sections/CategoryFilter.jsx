'use client';

import { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

export default function CategoryFilter({
  priceRange,
  setPriceRange,
  filterGroups = [],
  clearFilters,
  activeFilterCount,
}) {
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);

  useEffect(() => {
    setLocalPriceRange(priceRange);
  }, [priceRange]);

  const handleSliderChange = (value) => {
    setLocalPriceRange(value);
    setPriceRange(value);
  };

  const handleInputChange = (index, value) => {
    const newValue = value === '' ? 0 : Number(value);
    const newRange = [...localPriceRange];
    newRange[index] = newValue;
    setLocalPriceRange(newRange);
    setPriceRange(newRange);
  };

  const defaultValue = ['price', ...filterGroups.map((g) => g.slug)];

  return (
    <Accordion type="multiple" defaultValue={defaultValue} className="w-full">
      {filterGroups.map((group) => (
        <AccordionItem key={group.slug} value={group.slug}>
          <AccordionTrigger>{group.name}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {group.options.map((opt) => (
                <label key={opt.id} className="flex items-center gap-3 cursor-pointer justify-between group">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={group.selected.includes(opt.id)}
                      onCheckedChange={(checked) => {
                        const next = checked
                          ? [...group.selected, opt.id]
                          : group.selected.filter((x) => x !== opt.id);
                        group.onSelect(next);
                      }}
                    />
                    <span className="text-sm">{opt.label}</span>
                  </div>
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    ({opt.count ?? 0})
                  </span>
                </label>
              ))}
              {(!group.options || group.options.length === 0) && (
                <p className="text-sm text-muted-foreground">No options</p>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}

      <AccordionItem value="price">
        <AccordionTrigger>Price</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-6 pt-2">
            <div className="flex items-center gap-4">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                <Input
                  type="number"
                  value={localPriceRange[0]}
                  onChange={(e) => handleInputChange(0, e.target.value)}
                  className="pl-6 h-9"
                />
              </div>
              <span className="text-muted-foreground">-</span>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                <Input
                  type="number"
                  value={localPriceRange[1]}
                  onChange={(e) => handleInputChange(1, e.target.value)}
                  className="pl-6 h-9"
                />
              </div>
            </div>
            <Slider
              defaultValue={[0, 500000]}
              value={localPriceRange}
              max={500000}
              step={100}
              minStepsBetweenThumbs={1}
              onValueChange={handleSliderChange}
              className="my-6"
            />
            <button
              type="button"
              onClick={() => {
                const reset = [0, 500000];
                setLocalPriceRange(reset);
                setPriceRange(reset);
              }}
              className="text-sm text-muted-foreground underline hover:text-foreground"
            >
              Clear
            </button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
