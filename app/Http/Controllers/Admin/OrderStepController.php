<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\OrderStep;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrderStepController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/OrderSteps/Index', [
            'orderSteps' => OrderStep::orderBy('sort_order')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validateData($request);
        OrderStep::create($data);

        return back()->with('success', 'Langkah order berhasil ditambahkan.');
    }

    public function update(Request $request, OrderStep $orderStep): RedirectResponse
    {
        $data = $this->validateData($request);
        $orderStep->update($data);

        return back()->with('success', 'Langkah order berhasil diperbarui.');
    }

    public function destroy(OrderStep $orderStep): RedirectResponse
    {
        $orderStep->delete();

        return back()->with('success', 'Langkah order berhasil dihapus.');
    }

    private function validateData(Request $request): array
    {
        return $request->validate([
            'icon' => ['required', 'string', 'max:50'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:255'],
            'sort_order' => ['nullable', 'integer'],
        ]);
    }
}
