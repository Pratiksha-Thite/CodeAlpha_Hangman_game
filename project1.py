
import random

words = ['python', 'hangman', 'developer', 'coding', 'programming']
max_guesses = 6
secret_word = random.choice(words)
guessed_letters = []
incorrect_guesses = 0

def display_word():
    display = []
    for letter in secret_word:
        if letter in guessed_letters:
            display.append(letter)
        else:
            display.append('_')
    return ' '.join(display)

def print_status():
    print(f"\nWord: {display_word()}")
    print(f"Guesses left: {max_guesses - incorrect_guesses}")
    print(f"Wrong letters: {', '.join([l for l in guessed_letters if l not in secret_word])}")

def check_win():
    return all(letter in guessed_letters for letter in secret_word)

# Game loop
while incorrect_guesses < max_guesses:
    print_status()
    guess = input("Guess a letter: ").lower()

    if len(guess) != 1 or not guess.isalpha():
        print("Please enter a single letter")
        continue

    if guess in guessed_letters:
        print("You already guessed that letter")
        continue

    guessed_letters.append(guess)

    if guess not in secret_word:
        incorrect_guesses += 1
        print("Wrong guess!")
    else:
        print("Correct!")

    if check_win():
        print(f"\nYou won! The word was: {secret_word}")
        break

if incorrect_guesses >= max_guesses:
    print(f"\nGame over! The word was: {secret_word}")
