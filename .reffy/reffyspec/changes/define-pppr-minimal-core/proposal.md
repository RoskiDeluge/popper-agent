# Proposal: define `pppr` minimal core

## Why

The current repository contains `pi` packages and capabilities that solve more than the immediate `pppr` goal requires. Without an explicit spec boundary, adapting `pi` into `pppr` risks becoming one of two incoherent efforts:

- a shallow rename of `pi` with accidental feature inheritance
- a sprawling redesign driven by future runtime hosts instead of current harness needs

Both outcomes work against the stated intent for `pppr`: a small, observable, predictable coding agent harness centered on the CLI.

The purpose of this proposal is to define the initial product and architecture boundary for `pppr` before implementation work starts.

## What Changes

This proposal defines `pppr` as a minimal, CLI-first general-purpose coding agent harness that selectively reuses `pi` internals without inheriting unnecessary product surface.

The change establishes these required v1 characteristics:

- a minimal visible system prompt contract
- a minimal default toolset: `read`, `edit`, `write`, `bash`
- hierarchical local instruction loading
- observable session and event logging
- synchronous CLI-native command execution
- explicit session continuation behavior

The change also establishes these scope constraints:

- `pppr` is not required to reach feature parity with `pi`
- future runtime hosts such as a custom Rust shell or Tauri terminal are downstream consumers, not initial architectural drivers
- broad provider compatibility, custom TUI work, MCP support, built-in planning systems, and sub-agent orchestration are outside the minimal v1 scope

## Impact

This proposal does not implement `pppr`, but it creates the planning baseline for subsequent implementation work.

Expected impact:

- later implementation work can evaluate `pi` subsystems against an explicit minimal-core boundary
- future proposals can extend `pppr` deliberately instead of inheriting existing `pi` surface accidentally
- CLI-first behavior, observability, and composability with the host environment become protected design constraints rather than incidental preferences

## Reffy References
- `what_i_learned.md` - source philosophy and constraints from Zechner's explanation of why `pi` was built the way it was
- `pppr_minimal_harness.md` - exploration of what to preserve from `pi`, what to exclude, and the proposed minimal v1 shape
