import { NextRequest, NextResponse } from "next/server";

// In-memory storage for demo purposes
// In a real app, this would be a database
let users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "user" },
];

let nextId = 4;

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const role = searchParams.get("role");

        let filteredUsers = users;
        if (role) {
            filteredUsers = users.filter((user) => user.role === role);
        }

        return NextResponse.json({
            success: true,
            data: filteredUsers,
            count: filteredUsers.length,
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: "Failed to fetch users" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, role = "user" } = body;

        if (!name || !email) {
            return NextResponse.json(
                { success: false, error: "Name and email are required" },
                { status: 400 }
            );
        }

        // Check if email already exists
        const existingUser = users.find((user) => user.email === email);
        if (existingUser) {
            return NextResponse.json(
                { success: false, error: "Email already exists" },
                { status: 409 }
            );
        }

        const newUser = {
            id: nextId++,
            name,
            email,
            role,
        };

        users.push(newUser);

        return NextResponse.json(
            {
                success: true,
                data: newUser,
            },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, error: "Failed to create user" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                { success: false, error: "User ID is required" },
                { status: 400 }
            );
        }

        const userId = parseInt(id);
        const userIndex = users.findIndex((user) => user.id === userId);

        if (userIndex === -1) {
            return NextResponse.json(
                { success: false, error: "User not found" },
                { status: 404 }
            );
        }

        const deletedUser = users.splice(userIndex, 1)[0];

        return NextResponse.json({
            success: true,
            data: deletedUser,
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: "Failed to delete user" },
            { status: 500 }
        );
    }
}
