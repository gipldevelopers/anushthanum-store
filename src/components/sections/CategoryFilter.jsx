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
import { Button } from '@/components/ui/button';

export default function CategoryFilter({
    priceRange,
    setPriceRange,

    selectedPurposes,
    setSelectedPurposes,
    availablePurposes = [],
    selectedBeads,
    setSelectedBeads,
    availableBeads = [],
    selectedMukhis,
    setSelectedMukhis,

    availableMukhis = [],
    selectedPlatings,
    setSelectedPlatings,
    availablePlatings = [],
    clearFilters,
    activeFilterCount,
}) {
    // Local state for immediate UI feedback (smooth sliding/typing)
    const [localPriceRange, setLocalPriceRange] = useState(priceRange);

    // Sync local state when parent state changes (e.g., Clear Filters)
    useEffect(() => {
        setLocalPriceRange(priceRange);
    }, [priceRange]);

    // Handle slider change: update local immediately, parent after user stops interacting?
    // Actually, for immediate filtering, we update parent. But to avoid lag:
    // 1. We extracted this component, so it won't unmount on parent render. 
    // 2. This alone fixes most lag.
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


    return (
        <Accordion type="multiple" defaultValue={['purpose', 'price', 'bead', 'mukhi', 'plating']} className="w-full">
            <AccordionItem value="purpose">
                <AccordionTrigger>Purpose</AccordionTrigger>
                <AccordionContent>
                    <div className="space-y-3 pt-2">
                        {availablePurposes.map((purpose) => (
                            <label key={purpose.id} className="flex items-center gap-3 cursor-pointer justify-between group">
                                <div className="flex items-center gap-3">
                                    <Checkbox
                                        checked={selectedPurposes.includes(purpose.id)}
                                        onCheckedChange={(checked) => {
                                            if (checked) {
                                                setSelectedPurposes([...selectedPurposes, purpose.id]);
                                            } else {
                                                setSelectedPurposes(selectedPurposes.filter((p) => p !== purpose.id));
                                            }
                                        }}
                                    />
                                    <span className="text-sm">{purpose.label}</span>
                                </div>
                                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                                    ({purpose.count})
                                </span>
                            </label>
                        ))}
                    </div>
                </AccordionContent>
            </AccordionItem>



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

            <AccordionItem value="bead">
                <AccordionTrigger>Bead</AccordionTrigger>
                <AccordionContent>
                    <div className="space-y-3 pt-2">
                        {availableBeads.map((bead) => (
                            <label key={bead.id} className="flex items-center gap-3 cursor-pointer justify-between group">
                                <div className="flex items-center gap-3">
                                    <Checkbox
                                        checked={selectedBeads.includes(bead.id)}
                                        onCheckedChange={(checked) => {
                                            if (checked) {
                                                setSelectedBeads([...selectedBeads, bead.id]);
                                            } else {
                                                setSelectedBeads(selectedBeads.filter((b) => b !== bead.id));
                                            }
                                        }}
                                    />
                                    <span className="text-sm">{bead.label}</span>
                                </div>
                                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                                    ({bead.count})
                                </span>
                            </label>
                        ))}
                    </div>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="mukhi">
                <AccordionTrigger>Mukhi</AccordionTrigger>
                <AccordionContent>
                    <div className="space-y-3 pt-2">
                        {availableMukhis.map((mukhi) => (
                            <label key={mukhi.id} className="flex items-center gap-3 cursor-pointer justify-between group">
                                <div className="flex items-center gap-3">
                                    <Checkbox
                                        checked={selectedMukhis.includes(mukhi.id)}
                                        onCheckedChange={(checked) => {
                                            if (checked) {
                                                setSelectedMukhis([...selectedMukhis, mukhi.id]);
                                            } else {
                                                setSelectedMukhis(selectedMukhis.filter((m) => m !== mukhi.id));
                                            }
                                        }}
                                    />
                                    <span className="text-sm">{mukhi.label}</span>
                                </div>
                                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                                    ({mukhi.count})
                                </span>
                            </label>
                        ))}
                    </div>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="plating">
                <AccordionTrigger>Plating</AccordionTrigger>
                <AccordionContent>
                    <div className="space-y-3 pt-2">
                        {availablePlatings.map((plating) => (
                            <label key={plating.id} className="flex items-center gap-3 cursor-pointer justify-between group">
                                <div className="flex items-center gap-3">
                                    <Checkbox
                                        checked={selectedPlatings.includes(plating.id)}
                                        onCheckedChange={(checked) => {
                                            if (checked) {
                                                setSelectedPlatings([...selectedPlatings, plating.id]);
                                            } else {
                                                setSelectedPlatings(selectedPlatings.filter((p) => p !== plating.id));
                                            }
                                        }}
                                    />
                                    <span className="text-sm">{plating.label}</span>
                                </div>
                                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                                    ({plating.count})
                                </span>
                            </label>
                        ))}
                    </div>
                </AccordionContent>
            </AccordionItem>



        </Accordion>
    );
}
