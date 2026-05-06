import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom";
import QuizCard from "./QuizCard";
import { MemoryRouter } from "react-router-dom";

vi.mock("../AuthContext/AuthContext", () => ({
    useAuth: () => ({ isLoggedIn: false})
}))

describe("QuizCard", () => {
    const mockQuiz = {
        id: "1",
        title: "Mon Quiz",
        type: "Football",
        nbQuestions: 5
    };

    it("Afficher bouton jouer", () => {
        render(
            <MemoryRouter>
                <QuizCard {...mockQuiz} />
            </MemoryRouter>);
            expect(screen.getByText("Jouer")).toBeInTheDocument();
        
    })
     it("Afficher bouton supprimer", () => {
        render(
            <MemoryRouter>
                <QuizCard {...mockQuiz} />
            </MemoryRouter>);
            expect(screen.queryByText("Supprimer")).not.toBeInTheDocument();
        
    })
})