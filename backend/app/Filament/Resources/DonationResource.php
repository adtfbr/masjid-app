<?php

namespace App\Filament\Resources;

use App\Filament\Resources\DonationResource\Pages;
use App\Models\Donation;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class DonationResource extends Resource
{
    protected static ?string $model = Donation::class;

    protected static ?string $navigationIcon = 'heroicon-o-currency-dollar';
    protected static ?string $navigationLabel = 'Data Donasi';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('donor_name')
                    ->label('Nama Donatur')
                    ->default('Hamba Allah')
                    ->required(),

                Forms\Components\TextInput::make('amount')
                    ->label('Nominal (Rp)')
                    ->numeric()
                    ->prefix('Rp')
                    ->required(),

                Forms\Components\Select::make('category')
                    ->label('Peruntukan Donasi')
                    ->options([
                        'Operasional' => 'Operasional Masjid',
                        'Yatim' => 'Santunan Yatim',
                        'Pembangunan' => 'Renovasi & Pembangunan',
                        'Jumat' => 'Jumat Berkah (Makan)',
                    ])
                    ->required(),

                Forms\Components\Select::make('payment_method')
                    ->label('Metode Bayar')
                    ->options([
                        'manual' => 'Transfer Manual / QRIS',
                        'midtrans' => 'Payment Gateway',
                        'cash' => 'Tunai / Kotak Amal',
                    ])
                    ->default('manual'),

                Forms\Components\Select::make('status')
                    ->label('Status')
                    ->options([
                        'pending' => 'Menunggu Konfirmasi',
                        'verified' => 'Diterima (Sah)',
                        'rejected' => 'Ditolak',
                    ])
                    ->default('verified')
                    ->required(),

                Forms\Components\Textarea::make('notes')
                    ->label('Catatan / Doa')
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('donor_name')->searchable()->label('Donatur'),
                Tables\Columns\TextColumn::make('amount')->money('IDR')->sortable()->label('Nominal'),
                Tables\Columns\TextColumn::make('category')->label('Kategori'),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'verified' => 'success',
                        'pending' => 'warning',
                        'rejected' => 'danger',
                    }),
                Tables\Columns\TextColumn::make('created_at')->dateTime()->label('Waktu'),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
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
            'index' => Pages\ListDonations::route('/'),
            'create' => Pages\CreateDonation::route('/create'),
            'edit' => Pages\EditDonation::route('/{record}/edit'),
        ];
    }
}
