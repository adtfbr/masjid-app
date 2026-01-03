<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BankAccountResource\Pages;
use App\Models\BankAccount;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class BankAccountResource extends Resource
{
    protected static ?string $model = BankAccount::class;

    // Icon bisa diganti sesuai selera, pastikan pakai heroicon-o-...
    protected static ?string $navigationIcon = 'heroicon-o-building-library';

    protected static ?string $navigationLabel = 'Rekening Bank';

    // Opsional: Mengelompokkan menu di sidebar
    // protected static ?string $navigationGroup = 'Settings';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('bank_name')
                    ->label('Nama Bank')
                    ->required()
                    ->placeholder('Contoh: BSI, BCA, Mandiri'),

                Forms\Components\TextInput::make('account_number')
                    ->label('Nomor Rekening')
                    ->required()
                    ->numeric(), // Pastikan hanya angka

                Forms\Components\TextInput::make('account_name')
                    ->label('Atas Nama')
                    ->required(),

                Forms\Components\FileUpload::make('qris_image')
                    ->label('Gambar QRIS')
                    ->image() // Validasi harus file gambar
                    ->directory('qris-images') // Simpan di storage/app/public/qris-images
                    ->visibility('public')
                    ->columnSpanFull(), // Tampil lebar penuh

                Forms\Components\Toggle::make('is_active')
                    ->label('Aktifkan Rekening Ini')
                    ->default(true)
                    ->helperText('Jika aktif, rekening ini akan muncul di halaman depan website.'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('bank_name')
                    ->searchable()
                    ->sortable()
                    ->label('Bank'),

                Tables\Columns\TextColumn::make('account_number')
                    ->copyable() // Memudahkan admin copy norek
                    ->searchable()
                    ->label('No. Rekening'),

                Tables\Columns\TextColumn::make('account_name')
                    ->searchable()
                    ->label('Atas Nama'),

                Tables\Columns\ImageColumn::make('qris_image')
                    ->label('QRIS')
                    ->square(), // Tampilkan thumbnail kotak

                Tables\Columns\ToggleColumn::make('is_active')
                    ->label('Aktif'), // Bisa on/off langsung dari tabel
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

    // METHOD INI WAJIB ADA AGAR ROUTE TERBACA
    public static function getPages(): array
    {
        return [
            'index' => Pages\ListBankAccounts::route('/'),
            'create' => Pages\CreateBankAccount::route('/create'),
            'edit' => Pages\EditBankAccount::route('/{record}/edit'),
        ];
    }
}
