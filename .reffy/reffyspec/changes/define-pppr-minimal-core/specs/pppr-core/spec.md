# `pppr` Core Specification Delta

## ADDED Requirements

### Requirement: `pppr` shall be defined as a minimal CLI-first coding agent harness

The system shall define `pppr` as a general-purpose coding agent harness whose primary interaction surface is the command line interface.

#### Scenario: establishing the initial product boundary
- **WHEN** maintainers define the first `pppr` implementation scope
- **THEN** the CLI is treated as the primary user-facing surface
- **AND** future host runtimes are treated as downstream consumers rather than initial drivers of the architecture

### Requirement: `pppr` shall preserve a minimal visible operating contract

The system shall provide an operating contract that remains small enough for a user to inspect directly, including the effective system prompt, the default tool surface, and the applicable local instruction files.

#### Scenario: inspecting default behavior
- **WHEN** a user wants to understand what behavior the harness is enforcing
- **THEN** the user can inspect a concise prompt and tool contract
- **AND** the behavior is not primarily defined by hidden orchestration or broad undocumented injections

### Requirement: `pppr` shall provide a minimal default toolset

The system shall define the default mutable toolset as `read`, `edit`, `write`, and `bash`.

#### Scenario: selecting the default v1 tool contract
- **WHEN** the initial `pppr` tool surface is configured
- **THEN** the default mutable tools are limited to `read`, `edit`, `write`, and `bash`
- **AND** additional built-in tools are treated as optional future scope rather than required baseline behavior

### Requirement: `pppr` shall support hierarchical local instruction loading

The system shall support loading local instruction files in a hierarchical manner so project-specific guidance can refine broader defaults without requiring protocol-heavy integration layers.

#### Scenario: applying project-local guidance
- **WHEN** `pppr` runs inside a project with local instructions
- **THEN** the harness loads those instructions as part of the active context contract
- **AND** the instruction-loading model remains compatible with future host environments that wrap the CLI

### Requirement: `pppr` shall keep session activity observable

The system shall preserve observable records of session behavior, including model-visible exchanges and user-visible tool activity, so operators can inspect what the harness did.

#### Scenario: auditing a prior session
- **WHEN** a user reviews an earlier `pppr` session
- **THEN** the session contains enough transcript and event information to understand the agent's visible decisions and actions
- **AND** the format supports later reuse by alternate interfaces or post-processing tools

### Requirement: `pppr` shall prefer synchronous CLI-native execution

The system shall prefer synchronous command execution and composition with host tools instead of built-in background orchestration for the initial implementation.

#### Scenario: handling longer-running workflows
- **WHEN** a workflow requires process management beyond a single synchronous command
- **THEN** the initial `pppr` design prefers composition with external host tools such as terminal multiplexers
- **AND** background process supervision is not required for the minimal v1 scope

### Requirement: `pppr` shall selectively reuse `pi` internals

The system shall allow reuse of `pi` internals where that reuse supports the minimal `pppr` scope, but it shall not require inheriting unrelated `pi` product surface as part of defining `pppr`.

#### Scenario: deciding whether an existing `pi` capability belongs in `pppr`
- **WHEN** maintainers evaluate an existing `pi` subsystem or feature
- **THEN** it may be reused if it supports the minimal harness scope
- **AND** it may be excluded if it primarily represents broader product surface rather than core harness requirements
