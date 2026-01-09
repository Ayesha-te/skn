import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, Order, Collection, Category } from "@/data/products";

const BASE_URL = "https://sleepy-carrie-ayesha25-2b164d3d.koyeb.app";
const API_BASE_URL = `${BASE_URL}/api`;

const formatUrl = (url: string | undefined) => {
  if (!url) return undefined;
  if (url.startsWith('http')) return url;
  return `${BASE_URL}${url}`;
};

interface AdminDataContextType {
  products: Product[];
  orders: Order[];
  collections: Collection[];
  categories: Category[];
  user: any | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  signup: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  addProduct: (product: FormData) => Promise<void>;
  updateProduct: (id: string, product: FormData | Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addOrder: (order: Omit<Order, "id" | "createdAt" | "status">) => Promise<void>;
  updateOrderStatus: (id: string, status: Order["status"]) => Promise<void>;
  addCollection: (collection: FormData) => Promise<void>;
  updateCollection: (id: string, collection: FormData | Partial<Collection>) => Promise<void>;
  deleteCollection: (id: string) => Promise<void>;
  refreshProducts: () => Promise<void>;
  refreshCategories: () => Promise<void>;
}

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

export const AdminDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    fetchData();
  }, []);

  const getAuthHeader = () => {
    const auth = localStorage.getItem('user_auth');
    return auth ? { 'Authorization': `Basic ${auth}` } : {};
  };

  const checkAuth = async () => {
    try {
      const authHeader = getAuthHeader();
      if (!Object.keys(authHeader).length) {
        setLoading(false);
        return;
      }
      const response = await fetch(`${API_BASE_URL}/me/`, {
        headers: authHeader,
        credentials: 'include'
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        localStorage.removeItem('user_auth');
      }
    } catch (error) {
      console.error("Auth check failed", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    await Promise.all([refreshProducts(), refreshOrders(), refreshCollections(), refreshCategories()]);
  };

  const refreshCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories/`);
      if (response.ok) {
        const data = await response.json();
        const formattedData = data.map((c: any) => ({
          ...c,
          image: formatUrl(c.image)
        }));
        setCategories(formattedData);
      }
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const refreshProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/`);
      if (response.ok) {
        const data = await response.json();
        const formattedData = data.map((p: any) => ({
          ...p,
          image: formatUrl(p.image),
          video: formatUrl(p.video),
          images: p.images ? p.images.map((img: any) => ({ ...img, image: formatUrl(img.image) })) : []
        }));
        setProducts(formattedData);
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const refreshOrders = async () => {
    try {
      const authHeader = getAuthHeader();
      if (!Object.keys(authHeader).length) return;

      const response = await fetch(`${API_BASE_URL}/orders/`, {
        headers: authHeader,
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        const mappedOrders = data.map((o: any) => ({
          ...o,
          customer: {
            email: o.email,
            firstName: o.first_name,
            lastName: o.last_name,
            address: o.address,
            city: o.city,
            country: o.country,
            postalCode: o.postal_code,
            phone: o.phone
          }
        }));
        setOrders(mappedOrders);
      }
    } catch (error) {
      console.error("Failed to fetch orders", error);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const auth = btoa(`${username}:${password}`);
      const response = await fetch(`${API_BASE_URL}/login/`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ username, password })
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        localStorage.setItem('user_auth', auth);
        fetchData();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login failed", error);
      return false;
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ username, email, password, is_staff: false })
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        const auth = btoa(`${username}:${password}`);
        localStorage.setItem('user_auth', auth);
        fetchData();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Signup failed", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user_auth');
  };

  const refreshCollections = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/collections/`);
      if (response.ok) {
        const data = await response.json();
        const formattedData = data.map((c: any) => ({
          ...c,
          image: formatUrl(c.image)
        }));
        setCollections(formattedData);
      }
    } catch (error) {
      console.error("Failed to fetch collections", error);
    }
  };

  const addProduct = async (formData: FormData) => {
    await fetch(`${API_BASE_URL}/products/`, {
      method: 'POST',
      headers: getAuthHeader(),
      credentials: 'include',
      body: formData
    });
    await refreshProducts();
  };

  const updateProduct = async (id: string, product: FormData | Partial<Product>) => {
    const isFormData = product instanceof FormData;
    await fetch(`${API_BASE_URL}/products/${id}/`, {
      method: 'PATCH',
      headers: {
        ...getAuthHeader(),
        ...(isFormData ? {} : { 'Content-Type': 'application/json' })
      },
      credentials: 'include',
      body: isFormData ? product : JSON.stringify(product)
    });
    await refreshProducts();
  };

  const deleteProduct = async (id: string) => {
    await fetch(`${API_BASE_URL}/products/${id}/`, {
      method: 'DELETE',
      headers: getAuthHeader(),
      credentials: 'include'
    });
    await refreshProducts();
  };

  const addOrder = async (orderData: Omit<Order, "id" | "createdAt" | "status">) => {
    const djangoOrder = {
      first_name: orderData.customer.firstName,
      last_name: orderData.customer.lastName,
      email: orderData.customer.email,
      address: orderData.customer.address,
      city: orderData.customer.city,
      country: orderData.customer.country,
      postal_code: orderData.customer.postalCode,
      phone: orderData.customer.phone,
      total: orderData.total,
      shipping: orderData.shipping,
      items: orderData.items.map(item => ({
        product: typeof item.productId === 'number' ? item.productId : null,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image_url: item.image
      }))
    };

    const response = await fetch(`${API_BASE_URL}/orders/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(djangoOrder)
    });
    if (response.ok) {
      await refreshOrders();
    } else {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Failed to place order');
    }
  };

  const updateOrderStatus = async (id: string, status: Order["status"]) => {
    await fetch(`${API_BASE_URL}/orders/${id}/`, {
      method: 'PATCH',
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ status })
    });
    await refreshOrders();
  };

  const addCollection = async (formData: FormData) => {
    await fetch(`${API_BASE_URL}/collections/`, {
      method: 'POST',
      headers: getAuthHeader(),
      credentials: 'include',
      body: formData
    });
    await refreshCollections();
  };

  const updateCollection = async (id: string, collection: FormData | Partial<Collection>) => {
    const isFormData = collection instanceof FormData;
    await fetch(`${API_BASE_URL}/collections/${id}/`, {
      method: 'PATCH',
      headers: {
        ...getAuthHeader(),
        ...(isFormData ? {} : { 'Content-Type': 'application/json' })
      },
      credentials: 'include',
      body: isFormData ? collection : JSON.stringify(collection)
    });
    await refreshCollections();
  };

  const deleteCollection = async (id: string) => {
    await fetch(`${API_BASE_URL}/collections/${id}/`, {
      method: 'DELETE',
      headers: getAuthHeader(),
      credentials: 'include'
    });
    await refreshCollections();
  };

  return (
    <AdminDataContext.Provider
      value={{
        products,
        orders,
        collections,
        categories,
        user,
        loading,
        login,
        signup,
        logout,
        addProduct,
        updateProduct,
        deleteProduct,
        addOrder,
        updateOrderStatus,
        addCollection,
        updateCollection,
        deleteCollection,
        refreshProducts,
        refreshCategories,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
};

export const useAdminData = () => {
  const context = useContext(AdminDataContext);
  if (context === undefined) {
    throw new Error("useAdminData must be used within an AdminDataProvider");
  }
  return context;
};
