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
import CategoryFilter from '@/components/sections/CategoryFilter';
import ProductCard from '@/components/ui/ProductCard';
import { getCategories } from '@/services/categoryApi';
import { getProducts } from '@/services/productApi';
import { useState, useEffect, useMemo } from 'react';

const UPLOAD_BASE = typeof window !== 'undefined'
  ? (process.env.NEXT_PUBLIC_SERVER_URL || process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/?$/, '') || '')
  : '';

function toFullImageUrl(path) {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return path.startsWith('/') ? `${UPLOAD_BASE}${path}` : `${UPLOAD_BASE}/${path}`;
}

function mapProductImages(product) {
  const base = product?.images?.length
    ? product.images.map((img) => (typeof img === 'string' ? toFullImageUrl(img) : img)).filter(Boolean)
    : product?.thumbnail
      ? [toFullImageUrl(product.thumbnail)]
      : ['/placeholder.svg'];
  return {
    ...product,
    images: base.length ? base : ['/placeholder.svg'],
  };
}

const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
];

const initialPurposes = [
    { id: 'Health', label: 'Health' },
    { id: 'Wealth', label: 'Wealth' },
    { id: 'Peace', label: 'Peace' },
    { id: 'Love', label: 'Love' },
    { id: 'Protection', label: 'Protection' },
    { id: 'Balance', label: 'Balance' },
    { id: 'Courage', label: 'Courage' },
];



const initialBeads = ['Rudraksha', 'Karungali', 'Pyrite', 'Sphatik', 'Rose Quartz', 'Tiger Eye', 'Lava', 'Amethyst', 'Sandalwood', 'Tulsi'].map((b) => ({ id: b, label: b }));
const initialMukhis = ['1 - Ek', '2 - Do', '3 - Teen', '4 - Chaar', '5 - Paanch', '6 - Chhey', '7 - Saat', '8 - Aath', '9 - Nau', '10 - Das', '11 - Gyaarah', '12 - Baarah', '13 - Terah', '14 - Chaudah', 'Ganesh', 'Gauri Shankar'].map((m) => ({ id: m, label: m }));
const initialPlatings = ['Silver', 'Gold', 'DuoTone'].map((p) => ({ id: p, label: p }));

export default function CategoryPage() {
    const params = useParams();
    const slugArray = params?.slug || [];
    const categorySlug = slugArray[0] || '';
    const subCategorySlug = slugArray[1] || '';

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCategories({ type: 'main' })
            .then((res) => setCategories(res?.categories || []))
            .catch(() => setCategories([]));
    }, []);

    const [viewMode, setViewMode] = useState('grid');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const [priceRange, setPriceRange] = useState([0, 500000]);
    const [selectedPurposes, setSelectedPurposes] = useState([]);
    const [selectedBeads, setSelectedBeads] = useState([]);
    const [selectedMukhis, setSelectedMukhis] = useState([]);
    const [selectedPlatings, setSelectedPlatings] = useState([]);
    const [sortBy, setSortBy] = useState('popular');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const category = useMemo(
        () => categories.find((c) => c.slug === categorySlug),
        [categories, categorySlug]
    );

    const categoryName = subCategorySlug
        ? subCategorySlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
        : (category?.name || 'All Products');

    useEffect(() => {
        if (!categorySlug) {
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        const params = {
            categorySlug,
            subCategorySlug: subCategorySlug || undefined,
            minPrice: priceRange[0] || undefined,
            maxPrice: priceRange[1] < 500000 ? priceRange[1] : undefined,
            purposes: selectedPurposes.length ? selectedPurposes.join(',') : undefined,
            beads: selectedBeads.length ? selectedBeads.join(',') : undefined,
            mukhis: selectedMukhis.length ? selectedMukhis.join(',') : undefined,
            platings: selectedPlatings.length ? selectedPlatings.join(',') : undefined,
            sort: sortBy,
            page: currentPage,
            limit: itemsPerPage,
        };
        getProducts(params)
            .then((res) => {
                const list = (res?.products || []).map(mapProductImages);
                setProducts(list);
                setTotal(res?.total ?? list.length);
                setTotalPages(res?.totalPages ?? 1);
            })
            .catch(() => {
                setProducts([]);
                setTotal(0);
                setTotalPages(0);
            })
            .finally(() => setIsLoading(false));
    }, [categorySlug, subCategorySlug, priceRange, selectedPurposes, selectedBeads, selectedMukhis, selectedPlatings, sortBy, currentPage]);

    const availablePurposes = useMemo(() => {
        const counts = {};
        initialPurposes.forEach((p) => (counts[p.id] = 0));
        products.forEach((p) => {
            const arr = p.filterAttributes?.purposes || [];
            arr.forEach((v) => { if (counts[v] !== undefined) counts[v]++; });
        });
        return initialPurposes.map((p) => ({ ...p, count: counts[p.id] || 0 }));
    }, [products]);

    const availableBeads = useMemo(() => {
        const counts = {};
        initialBeads.forEach((b) => (counts[b.id] = 0));
        products.forEach((p) => {
            const arr = p.filterAttributes?.beads || [];
            arr.forEach((v) => { if (counts[v] !== undefined) counts[v]++; });
        });
        return initialBeads.map((b) => ({ ...b, count: counts[b.id] || 0 })).filter((b) => b.count > 0);
    }, [products]);

    const availableMukhis = useMemo(() => {
        const counts = {};
        initialMukhis.forEach((m) => (counts[m.id] = 0));
        products.forEach((p) => {
            const arr = p.filterAttributes?.mukhis || [];
            arr.forEach((v) => { if (counts[v] !== undefined) counts[v]++; });
        });
        return initialMukhis.map((m) => ({ ...m, count: counts[m.id] || 0 })).filter((m) => m.count > 0);
    }, [products]);

    const availablePlatings = useMemo(() => {
        const counts = {};
        initialPlatings.forEach((p) => (counts[p.id] = 0));
        products.forEach((p) => {
            const arr = p.filterAttributes?.platings || [];
            arr.forEach((v) => { if (counts[v] !== undefined) counts[v]++; });
        });
        return initialPlatings.map((p) => ({ ...p, count: counts[p.id] || 0 }));
    }, [products]);

    const paginatedProducts = products;

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Reset pagination when filters change
    // Reset pagination when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [categorySlug, subCategorySlug, priceRange, selectedPurposes, selectedBeads, selectedMukhis, selectedPlatings, sortBy]);

    const activeFilterCount = useMemo(() => {
        let count = 0;
        if (priceRange[0] > 0 || priceRange[1] < 500000) count++;
        if (selectedPurposes.length > 0) count++;
        if (selectedBeads.length > 0) count++;
        if (selectedMukhis.length > 0) count++;
        if (selectedPlatings.length > 0) count++;
        return count;
    }, [priceRange, selectedPurposes, selectedBeads, selectedMukhis, selectedPlatings]);

    const clearFilters = () => {
        setPriceRange([0, 500000]);
        setSelectedPurposes([]);
        setSelectedBeads([]);
        setSelectedMukhis([]);
        setSelectedPlatings([]);
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



    const subCategories = category?.subCategories || [];

    if (!categorySlug || (categories.length > 0 && !category)) {
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
                        <div className="sticky top-28 space-y-6">
                            {subCategories.length > 0 && (
                                <div className="rounded-lg border border-border p-4">
                                    <h3 className="font-semibold mb-3">Subcategories</h3>
                                    <nav className="space-y-1">
                                        <Link
                                            href={`/category/${categorySlug}`}
                                            className={`block py-1.5 px-2 rounded text-sm transition-colors ${!subCategorySlug ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
                                        >
                                            All {category?.name || categorySlug}
                                        </Link>
                                        {subCategories.map((sub) => (
                                            <Link
                                                key={sub.id}
                                                href={`/category/${categorySlug}/${sub.slug}`}
                                                className={`block py-1.5 px-2 rounded text-sm transition-colors ${subCategorySlug === sub.slug ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
                                            >
                                                {sub.name}
                                            </Link>
                                        ))}
                                    </nav>
                                </div>
                            )}
                            <div>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-semibold">Filters</h3>
                                {activeFilterCount > 0 && (
                                    <Badge variant="secondary" className="text-xs">
                                        {activeFilterCount} active
                                    </Badge>
                                )}
                            </div>
                            <CategoryFilter
                                priceRange={priceRange}
                                setPriceRange={setPriceRange}
                                selectedPurposes={selectedPurposes}
                                setSelectedPurposes={setSelectedPurposes}
                                availablePurposes={availablePurposes}
                                selectedBeads={selectedBeads}
                                setSelectedBeads={setSelectedBeads}
                                availableBeads={availableBeads}
                                selectedMukhis={selectedMukhis}
                                setSelectedMukhis={setSelectedMukhis}
                                availableMukhis={availableMukhis}
                                clearFilters={clearFilters}
                                activeFilterCount={activeFilterCount}
                            />
                            </div>
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
                                            <CategoryFilter
                                                priceRange={priceRange}
                                                setPriceRange={setPriceRange}
                                                selectedPurposes={selectedPurposes}
                                                setSelectedPurposes={setSelectedPurposes}
                                                availablePurposes={availablePurposes}
                                                selectedBeads={selectedBeads}
                                                setSelectedBeads={setSelectedBeads}
                                                availableBeads={availableBeads}
                                                selectedMukhis={selectedMukhis}
                                                setSelectedMukhis={setSelectedMukhis}
                                                availableMukhis={availableMukhis}
                                                selectedPlatings={selectedPlatings}
                                                setSelectedPlatings={setSelectedPlatings}
                                                availablePlatings={availablePlatings}
                                                clearFilters={clearFilters}
                                                activeFilterCount={activeFilterCount}
                                            />
                                        </div>
                                        <Button
                                            className="w-full mt-4"
                                            onClick={() => setIsFilterOpen(false)}
                                        >
                                            Show {total} Products
                                        </Button>
                                    </DialogContent>
                                </Dialog>

                                <p className="text-sm text-muted-foreground hidden sm:block">
                                    <span className="font-medium text-foreground">{total}</span> products
                                </p>
                                <Select value={sortBy} onValueChange={setSortBy}>
                                    <SelectTrigger className="w-full sm:w-[180px] min-w-0">
                                        <SlidersHorizontal className="w-4 h-4 mr-2 shrink-0" />
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent align="start">
                                        {sortOptions.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
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

                                {/* <div className="hidden sm:flex border rounded-lg overflow-hidden">
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
                                </div> */}


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
                        ) : products.length > 0 ? (
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

                        {!isLoading && products.length > 0 && totalPages > 1 && (
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
