# Exploring `pppr`: a minimal general-purpose coding agent harness

## Why this artifact exists

This note explores how to adapt ideas and code from `pi` into a new agent harness called `pppr`.

The goal is not to recreate `pi` feature-for-feature. The goal is to preserve the philosophy Mario Zechner articulated in [`what_i_learned.md`](./what_i_learned.md): a coding agent should be small, observable, predictable, and shaped by real use rather than speculative platform-building.

`pppr` is intended to become a general-purpose CLI agent harness that can later run inside other environments I control, including:

- a custom shell written in Rust
- a custom terminal written with Tauri

Those projects matter as future runtime hosts, but they should not drive the first design of `pppr`. The immediate work is to identify the smallest useful harness we can carve out of `pi` without violating the original simplicity principles.

## Source thesis from Zechner's `pi`

The strongest ideas in `what_i_learned.md` are not individual features. They are constraints:

- context engineering matters more than harness cleverness
- hidden prompt/tool/context injection is harmful
- observability beats automation theater
- a very small toolset is enough for strong coding performance
- file-based, user-visible state beats internal agent state
- synchronous, boring primitives are easier to trust
- advanced features like MCP, built-in plan modes, background process managers, and sub-agents are often complexity traps rather than essentials

For `pppr`, these constraints should be treated as product requirements, not as implementation trivia.

## Working definition of `pppr`

`pppr` should be a minimal, general-purpose coding agent harness with a CLI-first interface.

It should:

- run as a straightforward terminal program
- expose a small, legible system prompt
- use a minimal tool surface
- keep session state inspectable and portable
- make context inputs explicit
- be easy to embed or wrap in other runtimes later

It should not initially try to be:

- a full desktop product
- a workflow orchestrator
- a permissions-heavy enterprise shell
- a framework for arbitrary integrations
- an agent platform with internal planning abstractions

## What to reuse from `pi`

The most valuable thing to reuse is not branding or package structure. It is the narrowness of the architecture.

### 1. Minimal prompt contract

`pppr` should start from a short system prompt that defines:

- the agent's role
- the available tools
- the expected editing/command discipline
- where local documentation and project instructions live

The prompt should stay small enough that a user can actually read and reason about it.

### 2. Minimal tool contract

The core `pi` toolset is close to the right baseline:

- `read`
- `edit`
- `write`
- `bash`

For `pppr`, this is likely enough for v1. If additional tools are added, they should clear a high bar:

- they must remove repeated user-visible friction
- they must not hide important context
- they must not introduce large prompt overhead

### 3. Hierarchical context files

`pi`'s `AGENTS.md` loading model is one of the most portable ideas in the project. `pppr` should preserve hierarchical instruction loading because it supports local control without adding protocol complexity.

This fits the intended future hierarchy as well:

- global user guidance
- project guidance
- runtime-host-specific guidance where needed

But `pppr` itself should remain the authority for how those files are resolved and surfaced.

### 4. Observability-first sessions

`pppr` should treat transcripts, tool calls, command outputs, and file operations as first-class artifacts. The user should be able to inspect what happened without reverse-engineering hidden orchestration.

This suggests:

- a clean session format
- explicit event logging
- a UI-agnostic core event stream

That would let the CLI remain primary while allowing later Rust-shell or Tauri integrations to consume the same event model.

### 5. CLI-native execution model

The most important operational idea from `pi` is that the terminal is not a dumb transport. It is the natural habitat of the coding agent.

`pppr` should therefore prefer:

- plain CLI interaction
- synchronous commands
- user-visible shell outputs
- external tools like `tmux` for advanced process workflows

This keeps the harness small and avoids inventing a process supervisor too early.

## What not to import blindly from `pi`

`pi` includes several layers that were worth building for Mario's needs but may be too much if the immediate goal is a small harness extraction.

### 1. Broad provider ambition

Multi-provider support is useful, but `pppr` does not need to prove itself by supporting every model API on day one. A narrower model layer would better match the simplicity goal.

The test for every provider feature should be: does this help preserve harness simplicity, or is it turning `pppr` into an LLM compatibility project?

### 2. Rich TUI investment

`pi-tui` is thoughtful work, but `pppr` does not need a custom terminal UI framework to validate its thesis. A plain CLI loop is the right center of gravity.

If a richer interface emerges later, it should grow from a stable core event model rather than from an early UI commitment.

### 3. Feature parity pressure

It would be easy to drift into:

- slash command systems
- theme engines
- session branching UX
- HTML export
- rich editor features

These are not obviously wrong. They are simply not required to prove that `pppr` can be a minimal general-purpose agent harness.

## Proposed architectural direction

The cleanest interpretation is:

`pppr` = extract the smallest durable "agent harness core" from `pi`, then rebuild a CLI around that core with fewer assumptions.

That core likely needs only a handful of concerns:

- model interaction
- agent loop
- tool registration and execution
- session/event serialization
- instruction/context loading
- CLI transport

Everything else should be treated as optional or deferred.

## Design principles for adaptation

To stay faithful to Zechner's original project, `pppr` should adopt these principles explicitly.

### Principle 1: small visible surface area

Every built-in behavior should be inspectable by reading a short prompt, a short tool list, and a short set of local instructions.

### Principle 2: no hidden orchestration

If the harness injects context, transforms state, or rewrites behavior, the user should be able to see that plainly.

### Principle 3: file-based explicit state over internal magic

Plans, notes, and durable task state should live in files when they need to persist. The harness should not invent internal planning abstractions unless they are clearly superior and still observable.

### Principle 4: use the host environment instead of replacing it

Shells, terminals, `tmux`, markdown files, and repo-local instructions already solve many problems. `pppr` should compose with them rather than absorbing them.

### Principle 5: optimize for embedding later, not abstraction now

The custom Rust shell and Tauri terminal matter because they imply future embedding. The right response is a stable core plus a narrow CLI API, not premature multi-host architecture.

## A minimal `pppr` v1 shape

An initial version of `pppr` could be intentionally plain:

- a CLI entrypoint
- one default model/provider path
- four core tools: `read`, `edit`, `write`, `bash`
- hierarchical instruction loading
- append-only session/event log
- plain-text streaming output
- explicit resume/continue of prior sessions

That is already enough to test whether the harness is useful.

## Boundaries for this exploration

This artifact intentionally does not define:

- the final package layout
- the final model/provider strategy
- how Rust-shell embedding works
- how the Tauri terminal consumes events
- whether `pppr` remains tied to the `pi` codebase or becomes a cleaner fork/extraction

Those are follow-on planning questions, not prerequisites for stating the design direction.

## Key tension to resolve later

There is one central tension in this effort:

Should `pppr` be a lightly renamed derivative of `pi`, or should it be a smaller harness that selectively reuses `pi` internals while rejecting much of the surrounding product surface?
<!-- It should selectively reuse pi internals and not worry about the surrouding product surface, since this can be developed independently of pi's approach. -->

Based on the philosophy in `what_i_learned.md`, the second option appears more coherent. The point is not to preserve all of `pi`. The point is to preserve the discipline that made `pi` compelling.
<!-- Correct. -->

## Suggested next planning move

If this direction still feels right after review, the next step should be a ReffySpec change proposal focused on one question:

How do we define the smallest viable `pppr` core and CLI surface that can be built from `pi` without inheriting unnecessary complexity?
<!-- I agree and I like the minimal v1 shape you proposed above. -->

That proposal should cite:

- `what_i_learned.md`
- `pppr_minimal_harness.md`
