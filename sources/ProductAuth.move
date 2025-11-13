module 0xREPLACE::ProductAuth {
    use std::signer;
    use std::vector;

    struct Product has copy, drop, store {
        id: u64,
        owner: address,
        name: vector<u8>,
        metadata: vector<u8>,
    }

    struct Registry has key {
        products: vector<Product>,
        next_id: u64,
    }

    public fun init_registry(account: &signer) {
        let addr = signer::address_of(account);
        assert!(!exists<Registry>(addr), 1);
        let r = Registry { products: vector::empty<Product>(), next_id: 1u64 };
        move_to(account, r);
    }

    public fun register_product(account: &signer, name: vector<u8>, metadata: vector<u8>) {
        let addr = signer::address_of(account);
        if (!exists<Registry>(addr)) {
            init_registry(account);
        };
        let reg = borrow_global_mut<Registry>(addr);
        let id = reg.next_id;
        reg.next_id = id + 1;
        let p = Product { id, owner: addr, name, metadata };
        vector::push_back(&mut reg.products, p);
    }

    public fun get_product(owner_addr: address, token_id: u64): vector<u8> acquires Registry {
        assert!(exists<Registry>(owner_addr), 2);
        let reg_ref = borrow_global<Registry>(owner_addr);
        let len = vector::length(&reg_ref.products);
        let mut i = 0;
        while (i < len) {
            let prod_ref = vector::borrow(&reg_ref.products, i);
            if (prod_ref.id == token_id) {
                return prod_ref.metadata;
            };
            i = i + 1;
        };
        abort 3;
    }

    public fun get_next_id(owner_addr: address): u64 acquires Registry {
        assert!(exists<Registry>(owner_addr), 4);
        let reg_ref = borrow_global<Registry>(owner_addr);
        reg_ref.next_id
    }
}

