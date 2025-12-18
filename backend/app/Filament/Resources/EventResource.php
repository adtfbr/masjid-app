<?php

namespace App\Filament\Resources;

use App\Filament\Resources\EventResource\Pages;
use App\Models\Event;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class EventResource extends Resource
{
    protected static ?string $model = Event::class;

    protected static ?string $navigationIcon = 'heroicon-o-calendar';
    protected static ?string $navigationLabel = 'Kegiatan Masjid';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('title')
                    ->label('Nama Kegiatan')
                    ->required()
                    ->maxLength(255)
                    ->live(onBlur: true)
                    ->afterStateUpdated(function (string $operation, $state, Forms\Set $set) {
                        if ($operation === 'create') {
                            $set('slug', Str::slug($state));
                        }
                    }),

                Forms\Components\TextInput::make('slug')
                    ->label('Slug URL (Otomatis)')
                    ->disabled()
                    ->dehydrated()
                    ->required()
                    ->unique(Event::class, 'slug', ignoreRecord: true),

                Forms\Components\Select::make('category')
                    ->label('Kategori')
                    ->options([
                        'Kajian' => 'Kajian Rutin',
                        'Sosial' => 'Sosial & Kemanusiaan',
                        'Pendidikan' => 'Pendidikan (TPA/Bimbel)',
                        'PHBI' => 'Peringatan Hari Besar Islam',
                    ])
                    ->required(),

                // --- TAMBAHAN BARU: UPLOAD GAMBAR ---
                Forms\Components\FileUpload::make('image')
                    ->label('Poster Kegiatan')
                    ->image() // Validasi harus gambar
                    ->directory('events') // Simpan di folder storage/app/public/events
                    ->visibility('public')
                    ->columnSpanFull(),
                // ------------------------------------

                Forms\Components\DatePicker::make('date')
                    ->label('Tanggal Pelaksanaan')
                    ->required(),

                Forms\Components\TextInput::make('time')
                    ->label('Waktu (Jam)')
                    ->placeholder('Contoh: 04:30 - Selesai')
                    ->required(),

                Forms\Components\TextInput::make('speaker')
                    ->label('Pemateri / Ustadz')
                    ->placeholder('Nama Ustadz (Jika ada)'),

                Forms\Components\TextInput::make('location')
                    ->label('Lokasi')
                    ->default('Masjid Al-Huda'),

                Forms\Components\Textarea::make('description')
                    ->label('Deskripsi Singkat')
                    ->columnSpanFull(),

                Forms\Components\Toggle::make('is_active')
                    ->label('Tampilkan di Website?')
                    ->default(true),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                // Tampilkan Thumbnail Gambar di Tabel Admin
                Tables\Columns\ImageColumn::make('image')->label('Poster'),
                Tables\Columns\TextColumn::make('title')->sortable()->searchable()->label('Kegiatan'),
                Tables\Columns\TextColumn::make('date')->date()->sortable()->label('Tanggal'),
                Tables\Columns\TextColumn::make('category')->sortable(),
                Tables\Columns\IconColumn::make('is_active')->boolean()->label('Aktif'),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListEvents::route('/'),
            'create' => Pages\CreateEvent::route('/create'),
            'edit' => Pages\EditEvent::route('/{record}/edit'),
        ];
    }
}
