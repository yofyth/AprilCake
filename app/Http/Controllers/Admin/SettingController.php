<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class SettingController extends Controller
{
    public function edit(): Response
    {
        $setting = Setting::current();

        return Inertia::render('Admin/Settings', [
            'setting' => array_merge($setting->toArray(), [
                'hero_image_urls' => $setting->hero_image_urls,
            ]),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $setting = Setting::current();

        $data = $request->validate([
            'site_name' => ['required', 'string', 'max:255'],
            'site_tagline' => ['nullable', 'string', 'max:255'],
            'hero_title_line1' => ['nullable', 'string', 'max:255'],
            'hero_title_line2' => ['nullable', 'string', 'max:255'],
            'hero_description' => ['nullable', 'string'],
            'phone' => ['nullable', 'string', 'max:50'],
            'whatsapp' => ['nullable', 'string', 'max:50'],
            'instagram' => ['nullable', 'string', 'max:100'],
            'tiktok' => ['nullable', 'string', 'max:100'],
            'address' => ['nullable', 'string', 'max:255'],
            'hours_weekday' => ['nullable', 'string', 'max:100'],
            'hours_weekend' => ['nullable', 'string', 'max:100'],
        ]);

        if ($request->hasFile('hero_images')) {
            foreach ((array) $setting->hero_images as $old) {
                Storage::disk('public')->delete($old);
            }
            $data['hero_images'] = collect($request->file('hero_images'))
                ->map(fn ($file) => $file->store('hero', 'public'))
                ->values()
                ->all();
        }

        $setting->update($data);

        return back()->with('success', 'Pengaturan berhasil disimpan.');
    }
}