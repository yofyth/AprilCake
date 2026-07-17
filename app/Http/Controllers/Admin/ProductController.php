<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Products/Index', [
            'products' => Product::orderBy('sort_order')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Products/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validateData($request);

        $data['slug'] = Str::slug($data['name']);
        $data['image'] = $this->storeImage($request, 'image');
        $data['gallery'] = $this->storeGallery($request);
        $data['features'] = $this->parseFeatures($request);

        Product::create($data);

        return redirect()->route('admin.products.index')->with('success', 'Menu berhasil ditambahkan.');
    }

    public function edit(Product $product): Response
    {
        return Inertia::render('Admin/Products/Edit', [
            'product' => $product,
        ]);
    }

    public function update(Request $request, Product $product): RedirectResponse
    {
        $data = $this->validateData($request, $product->id);

        $data['slug'] = Str::slug($data['name']);

        if ($request->hasFile('image')) {
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }
            $data['image'] = $this->storeImage($request, 'image');
        }

        if ($request->hasFile('gallery')) {
            foreach ((array) $product->gallery as $old) {
                Storage::disk('public')->delete($old);
            }
            $data['gallery'] = $this->storeGallery($request);
        }

        $data['features'] = $this->parseFeatures($request);

        $product->update($data);

        return redirect()->route('admin.products.index')->with('success', 'Menu berhasil diperbarui.');
    }

    public function destroy(Product $product): RedirectResponse
    {
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }
        foreach ((array) $product->gallery as $g) {
            Storage::disk('public')->delete($g);
        }
        $product->delete();

        return redirect()->route('admin.products.index')->with('success', 'Menu berhasil dihapus.');
    }

    private function validateData(Request $request, ?int $ignoreId = null): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'tagline' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'category' => ['nullable', 'string', 'max:100'],
            'price' => ['required', 'numeric', 'min:0'],
            'badge' => ['nullable', 'string', 'max:50'],
            'is_bestseller' => ['boolean'],
            'is_active' => ['boolean'],
            'sort_order' => ['nullable', 'integer'],
        ]);
    }

    private function storeImage(Request $request, string $field): ?string
    {
        if (! $request->hasFile($field)) {
            return null;
        }

        return $request->file($field)->store('products', 'public');
    }

    private function storeGallery(Request $request): array
    {
        if (! $request->hasFile('gallery')) {
            return [];
        }

        return collect($request->file('gallery'))
            ->map(fn ($file) => $file->store('products', 'public'))
            ->values()
            ->all();
    }

    private function parseFeatures(Request $request): array
    {
        $icons = (array) $request->input('feature_icon', []);
        $titles = (array) $request->input('feature_title', []);
        $descs = (array) $request->input('feature_desc', []);

        $features = [];
        foreach ($titles as $i => $title) {
            if (blank($title)) {
                continue;
            }
            $features[] = [
                'icon' => $icons[$i] ?? 'cake-slice',
                'title' => $title,
                'desc' => $descs[$i] ?? '',
            ];
        }

        return $features;
    }
}
