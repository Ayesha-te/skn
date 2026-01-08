import { useState, useEffect } from "react";
import { Product, Order, Collection, products as initialProducts } from "@/data/products";

export const useAdminData = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    // Load products
    const savedProducts = localStorage.getItem("skn_products");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      setProducts(initialProducts);
      localStorage.setItem("skn_products", JSON.stringify(initialProducts));
    }

    // Load orders
    const savedOrders = localStorage.getItem("skn_orders");
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }

    // Load collections
    const savedCollections = localStorage.getItem("skn_collections");
    if (savedCollections) {
      setCollections(JSON.parse(savedCollections));
    }
  }, []);

  const saveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem("skn_products", JSON.stringify(newProducts));
  };

  const saveOrders = (newOrders: Order[]) => {
    setOrders(newOrders);
    localStorage.setItem("skn_orders", JSON.stringify(newOrders));
  };

  const saveCollections = (newCollections: Collection[]) => {
    setCollections(newCollections);
    localStorage.setItem("skn_collections", JSON.stringify(newCollections));
  };

  const addProduct = (product: Product) => {
    const newProducts = [...products, product];
    saveProducts(newProducts);
  };

  const updateProduct = (id: string, updatedProduct: Product) => {
    const newProducts = products.map((p) => (p.id === id ? updatedProduct : p));
    saveProducts(newProducts);
  };

  const deleteProduct = (id: string) => {
    const newProducts = products.filter((p) => p.id !== id);
    saveProducts(newProducts);
  };

  const updateOrderStatus = (id: string, status: Order["status"]) => {
    const newOrders = orders.map((o) => (o.id === id ? { ...o, status } : o));
    saveOrders(newOrders);
  };

  const addCollection = (collection: Collection) => {
    const newCollections = [...collections, collection];
    saveCollections(newCollections);
  };

  const deleteCollection = (id: string) => {
    const newCollections = collections.filter((c) => c.id !== id);
    saveCollections(newCollections);
  };

  return {
    products,
    orders,
    collections,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    addCollection,
    deleteCollection,
  };
};
