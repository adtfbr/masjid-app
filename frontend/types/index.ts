export interface User {
    id: number;
    name: string;
    email: string;
}

export interface Expense {
    id: number;
    title: string;
    description?: string;
    amount: number; // Dalam backend dikirim string (decimal), di frontend kita treat sebagai number/string
    category: 'operasional' | 'pembangunan' | 'sosial' | 'honor' | 'lainnya';
    expense_date: string;
    proof_file?: string;
    created_at: string;
    user?: User; // Relasi ke admin yg input
}

export interface PaginatedResponse<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    prev_page_url: string | null;
    total: number;
}

export interface BankAccount {
    id: number;
    bank_name: string;
    account_number: string;
    account_holder: string;
}

export interface Donation {
    id: number;
    donor_name: string;
    amount: number;
    bank_account_id?: number;
    bank_account?: BankAccount; // Relasi
    proof_file?: string;
    status: 'pending' | 'verified' | 'rejected';
    created_at: string;
    notes?: string;
}