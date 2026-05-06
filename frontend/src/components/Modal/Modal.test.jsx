import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom";
import Modal from "./Modal";
describe("Modal", () => {
    it("N'affiche pas le modal quand isOpen estfalse", () => {
        render(<Modal isOpen={false} onClose={vi.fn()} />)
        expect(screen.queryByText("Confirmer")).not.toBeInTheDocument();
    })
})