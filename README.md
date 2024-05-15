# Sudoku Game

This is a simple Sudoku game built using next.js, Supabase, and Tailwind CSS. Check out the live demo at [https://sudoku-game-website.vercel.app](https://sudoku-game-website.vercel.app)

![Demo Video](sudoku-demo.gif)

You can use your arrow keys or WASD to move the selected cell too.

## Getting Started

Create a project with [supabase](https://supabase.com). Next, run the following migration on Supabase to create a new sudoku_puzzles table on Supabase and seed some Sudoku puzzles:

```postgres
CREATE TABLE "public"."sudoku_puzzles" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" timestamp with time zone NOT NULL DEFAULT now(),
    "puzzle" text NOT NULL
);

CREATE UNIQUE INDEX sudoku_puzzles_pkey ON public.sudoku_puzzles USING btree (id);
CREATE UNIQUE INDEX sudoku_puzzles_puzzle_key ON public.sudoku_puzzles USING btree (puzzle);
ALTER TABLE "public"."sudoku_puzzles" ADD CONSTRAINT "sudoku_puzzles_pkey" PRIMARY KEY USING INDEX "sudoku_puzzles_pkey";
ALTER TABLE "public"."sudoku_puzzles" ADD CONSTRAINT "sudoku_puzzles_puzzle_key" UNIQUE USING INDEX "sudoku_puzzles_puzzle_key";

INSERT INTO "public"."sudoku_puzzles" (puzzle)
VALUES
  ('52...6.........7.13...........4..8..6......5...........418.........3..2...87.....'),
  ('837629145.4.318..2921574368.54186239163...8.7289.53416..28.56.1...241..3318967524'),
  ('634.28.15...456283528.13.6.45.397128213865.4.8..14.5.6.6.58..91381279654945631872'),
  ('.697.4123..26195.7471.5.8.693...8654.549.6..881.4.52..1.3...7.562..47.817985.1432'),
  ('293.16...71..32.69856.49213.32694......2.3...94.1.5326.2..6....481957..2....2...5')
;
```

If you ever need to reset your Supabase database, you can use this to drop the sudoku_puzzles table:

```
DROP TABLE "public"."sudoku_puzzles";
```

Create a `.env.local` file in the project root directory with your Supabase URL and Anonymous key in the format below

```env
NEXT_PUBLIC_SUPABASE_URL=<https://your-url-here.supabase.co>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anonymous-key-here>
```

Now, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the sudoku game.
