'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronRight,
    Filter,
    SlidersHorizontal,
    Search,
    X,
    Check,
    Grid3X3,
    LayoutList,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import ProductCard from '@/components/ui/ProductCard';
import {
    categories,
    products,
} from '@/data/products';
import { useState, useEffect, useMemo } from 'react';

const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
];

const priceRanges = [
    { min: 0, max: 2000, label: 'Under ₹2,000' },
    { min: 2000, max: 5000, label: '₹2,000 - ₹5,000' },
    { min: 5000, max: 20000, label: '₹5,000 - ₹20,000' },
    { min: 20000, max: 50000, label: '₹20,000 - ₹50,000' },
    { min: 50000, max: 500000, label: 'Above ₹50,000' },
];

export default function CategoryPage() {
    const params = useParams();
    // params.slug is an array in [...slug]
    const slugArray = params?.slug || [];
    const categorySlug = slugArray[0] || '';
    const subCategorySlug = slugArray[1] || '';

    const [isLoading, setIsLoading] = useState(true);
    const [viewMode, setViewMode] = useState('grid');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const [priceRange, setPriceRange] = useState([0, 500000]);
    const [selectedAvailability, setSelectedAvailability] = useState([]);
    const [selectedRatings, setSelectedRatings] = useState([]);
    const [sortBy, setSortBy] = useState('popular');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const category = categories.find((c) => c.slug === categorySlug);

    // Filter by Category and Subcategory
    const baseProducts = useMemo(() => {
        let filtered = products.filter(p => p.categorySlug === categorySlug);

        if (subCategorySlug) {
            // Direct match if property exists
            const directMatch = filtered.filter(p => p.subCategorySlug === subCategorySlug);
            if (directMatch.length > 0) {
                filtered = directMatch;
            } else {
                // Fallback: search in name/tags if subCategorySlug property missing
                // e.g. 'rudraksha-mala' -> 'Rudraksha Mala'
                // '1-mukhi' -> '1 Mukhi'
                const searchTerms = subCategorySlug.split('-').map(s => s.toLowerCase());
                filtered = filtered.filter(p => {
                    const nameLower = p.name.toLowerCase();
                    // simple check: if all parts of slug are in name? or exact match logic?
                    // simpler: '1-mukhi' check if '1' and 'mukhi' are in name
                    return searchTerms.every(term => nameLower.includes(term));
                });
            }
        }
        return filtered;
    }, [categorySlug, subCategorySlug]);

    const categoryName = subCategorySlug
        ? subCategorySlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
        : (category?.name || 'All Products');

    const filteredProducts = useMemo(() => {
        let result = [...baseProducts];

        result = result.filter(
            (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
        );

        if (selectedAvailability.length > 0) {
            result = result.filter((p) => {
                if (selectedAvailability.includes('in-stock') && p.inStock)
                    return true;
                if (selectedAvailability.includes('out-of-stock') && !p.inStock)
                    return true;
                return false;
            });
        }

        if (selectedRatings.length > 0) {
            result = result.filter((p) =>
                selectedRatings.some((r) => p.rating >= r)
            );
        }

        switch (sortBy) {
            case 'newest':
                result = result
                    .filter((p) => p.isNew)
                    .concat(result.filter((p) => !p.isNew));
                break;
            case 'price-low':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                result.sort((a, b) => b.rating - a.rating);
                break;
            case 'popular':
            default:
                result = result
                    .filter((p) => p.isBestseller)
                    .concat(result.filter((p) => !p.isBestseller));
                break;
        }

        return result;
    }, [baseProducts, priceRange, selectedAvailability, selectedRatings, sortBy]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredProducts, currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Reset pagination when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [categorySlug, subCategorySlug, priceRange, selectedAvailability, selectedRatings, sortBy]);

    const activeFilterCount = useMemo(() => {
        let count = 0;
        if (priceRange[0] > 0 || priceRange[1] < 500000) count++;
        if (selectedAvailability.length > 0) count++;
        if (selectedRatings.length > 0) count++;
        return count;
    }, [priceRange, selectedAvailability, selectedRatings]);

    const clearFilters = () => {
        setPriceRange([0, 500000]);
        setSelectedAvailability([]);
        setSelectedRatings([]);
        setIsFilterOpen(false);
    };

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => setIsLoading(false), 400);
        return () => clearTimeout(timer);
    }, [categorySlug, subCategorySlug]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(price);
    };

    const FilterPanel = () => (
        <div className="space-y-6">
            <div>
                <h4 className="font-medium mb-4">Price Range</h4>
                <div className="space-y-2">
                    {priceRanges.map((range) => (
                        <button
                            key={range.label}
                            type="button"
                            onClick={() => setPriceRange([range.min, range.max])}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${priceRange[0] === range.min && priceRange[1] === range.max
                                ? 'bg-primary/10 text-primary font-medium'
                                : 'hover:bg-muted'
                                }`}
                        >
                            {range.label}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <h4 className="font-medium mb-4">Availability</h4>
                <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <Checkbox
                            checked={selectedAvailability.includes('in-stock')}
                            onCheckedChange={(checked) => {
                                if (checked) {
                                    setSelectedAvailability([
                                        ...selectedAvailability,
                                        'in-stock',
                                    ]);
                                } else {
                                    setSelectedAvailability(
                                        selectedAvailability.filter((a) => a !== 'in-stock')
                                    );
                                }
                            }}
                        />
                        <span className="text-sm">In Stock</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                        <Checkbox
                            checked={selectedAvailability.includes('out-of-stock')}
                            onCheckedChange={(checked) => {
                                if (checked) {
                                    setSelectedAvailability([
                                        ...selectedAvailability,
                                        'out-of-stock',
                                    ]);
                                } else {
                                    setSelectedAvailability(
                                        selectedAvailability.filter((a) => a !== 'out-of-stock')
                                    );
                                }
                            }}
                        />
                        <span className="text-sm">Out of Stock</span>
                    </label>
                </div>
            </div>

            <div>
                <h4 className="font-medium mb-4">Customer Rating</h4>
                <div className="space-y-3">
                    {[4, 3, 2].map((rating) => (
                        <label
                            key={rating}
                            className="flex items-center gap-3 cursor-pointer"
                        >
                            <Checkbox
                                checked={selectedRatings.includes(rating)}
                                onCheckedChange={(checked) => {
                                    if (checked) {
                                        setSelectedRatings([...selectedRatings, rating]);
                                    } else {
                                        setSelectedRatings(
                                            selectedRatings.filter((r) => r !== rating)
                                        );
                                    }
                                }}
                            />
                            <span className="text-sm flex items-center gap-1">
                                {rating}+ Stars
                                <span className="text-secondary">{'★'.repeat(rating)}</span>
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {activeFilterCount > 0 && (
                <Button variant="outline" onClick={clearFilters} className="w-full">
                    Clear All Filters
                </Button>
            )}
        </div>
    );

    if (!category && !categorySlug) {
        return (
            <div className="container py-20 text-center">
                <h1 className="text-2xl font-serif font-bold mb-4">
                    Category not found
                </h1>
                <Link href="/" className="text-primary hover:underline">
                    Return to Home
                </Link>
            </div>
        );
    }

    return (
        <main className="py-6 md:py-10">
            <div className="container">
                <nav
                    className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6"
                    aria-label="Breadcrumb"
                >
                    <Link href="/" className="hover:text-primary transition-colors">
                        Home
                    </Link>
                    <ChevronRight className="w-3.5 h-3.5" />
                    <Link href={`/category/${categorySlug}`} className={`hover:text-primary transition-colors ${!subCategorySlug ? 'text-foreground font-medium' : ''}`}>
                        {category?.name || categorySlug}
                    </Link>
                    {subCategorySlug && (
                        <>
                            <ChevronRight className="w-3.5 h-3.5" />
                            <span className="text-foreground font-medium capitalize">{subCategorySlug.replace(/-/g, ' ')}</span>
                        </>
                    )}
                </nav>

                <div className="mb-8">
                    <motion.h1
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-2 capitalize"
                    >
                        {categoryName}
                    </motion.h1>
                    {category && !subCategorySlug && (
                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-sm text-muted-foreground max-w-xl"
                        >
                            {category.description}
                        </motion.p>
                    )}
                </div>

                <div className="flex gap-8">
                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <div className="sticky top-28">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-semibold">Filters</h3>
                                {activeFilterCount > 0 && (
                                    <Badge variant="secondary" className="text-xs">
                                        {activeFilterCount} active
                                    </Badge>
                                )}
                            </div>
                            <FilterPanel />
                        </div>
                    </aside>

                    <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-border">
                            <div className="flex items-center gap-3">
                                <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                                    <DialogTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="lg:hidden"
                                        >
                                            <Filter className="w-4 h-4 mr-2" />
                                            Filters
                                            {activeFilterCount > 0 && (
                                                <Badge
                                                    variant="secondary"
                                                    className="ml-2 text-xs"
                                                >
                                                    {activeFilterCount}
                                                </Badge>
                                            )}
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-sm max-h-[90vh] overflow-y-auto">
                                        <DialogHeader>
                                            <DialogTitle>Filters</DialogTitle>
                                        </DialogHeader>
                                        <div className="mt-4">
                                            <FilterPanel />
                                        </div>
                                        <Button
                                            className="w-full mt-4"
                                            onClick={() => setIsFilterOpen(false)}
                                        >
                                            Show {filteredProducts.length} Products
                                        </Button>
                                    </DialogContent>
                                </Dialog>

                                <p className="text-sm text-muted-foreground hidden sm:block">
                                    <span className="font-medium text-foreground">
                                        {filteredProducts.length}
                                    </span>{' '}
                                    products
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                {activeFilterCount > 0 && (
                                    <Badge variant="secondary" className="gap-1 hidden md:inline-flex">
                                        {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                                        <button
                                            type="button"
                                            onClick={() => setPriceRange([0, 500000])}
                                            className="ml-1 rounded hover:bg-muted"
                                            aria-label="Clear price"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </Badge>
                                )}

                                <div className="hidden sm:flex border rounded-lg overflow-hidden">
                                    <button
                                        type="button"
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 ${viewMode === 'grid'
                                            ? 'bg-primary text-primary-foreground'
                                            : 'hover:bg-muted'
                                            }`}
                                        aria-label="Grid view"
                                    >
                                        <Grid3X3 className="w-4 h-4" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 ${viewMode === 'list'
                                            ? 'bg-primary text-primary-foreground'
                                            : 'hover:bg-muted'
                                            }`}
                                        aria-label="List view"
                                    >
                                        <LayoutList className="w-4 h-4" />
                                    </button>
                                </div>

                                <Select value={sortBy} onValueChange={setSortBy}>
                                    <SelectTrigger className="w-full sm:w-[180px] min-w-0">
                                        <SlidersHorizontal className="w-4 h-4 mr-2 shrink-0" />
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent align="end">
                                        {sortOptions.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {isLoading ? (
                            <div
                                className={
                                    viewMode === 'grid'
                                        ? 'grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'
                                        : 'space-y-4'
                                }
                            >
                                {[...Array(6)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="aspect-[4/5] rounded-xl bg-muted/50 animate-pulse"
                                    />
                                ))}
                            </div>
                        ) : filteredProducts.length > 0 ? (
                            <motion.div
                                layout
                                className={
                                    viewMode === 'grid'
                                        ? 'grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'
                                        : 'space-y-4'
                                }
                            >
                                <AnimatePresence mode="popLayout">
                                    {paginatedProducts.map((product, index) => (
                                        <motion.div
                                            key={product.id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.98 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.98 }}
                                            transition={{ delay: index * 0.02 }}
                                        >
                                            <ProductCard product={product} index={index} />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        ) : (
                            <div className="text-center py-16 bg-muted/30 rounded-xl">
                                <Search className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                                <h3 className="font-medium mb-2">No products found</h3>
                                <p className="text-sm text-muted-foreground mb-4 max-w-sm mx-auto">
                                    {subCategorySlug
                                        ? `We couldn't find any products in ${subCategorySlug.replace(/-/g, ' ')}. Try adjusting your filters.`
                                        : 'Try adjusting your filters or browse our other categories'}
                                </p>
                                <Button onClick={clearFilters}>Clear Filters</Button>
                            </div>
                        )}

                        {!isLoading && filteredProducts.length > 0 && totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2 mt-12">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </Button>

                                <div className="flex items-center gap-1">
                                    {[...Array(totalPages)].map((_, i) => (
                                        <Button
                                            key={i + 1}
                                            variant={currentPage === i + 1 ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => handlePageChange(i + 1)}
                                            className="w-9 h-9 p-0"
                                        >
                                            {i + 1}
                                        </Button>
                                    ))}
                                </div>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
