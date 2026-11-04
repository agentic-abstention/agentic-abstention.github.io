# Agentic Abstention

Project website for **Agentic Abstention: Do Agents Know When to Stop Instead of Act?** (NeurIPS 2026).

- Website: https://agentic-abstention.github.io/
- Paper: https://arxiv.org/abs/2606.28733
- Research code and data: https://github.com/lhannnn/agentic-abstention

Static HTML, CSS, and JavaScript; no build step or external runtime dependencies. GitHub Pages serves the root of `main`. Preview locally with `python3 -m http.server 8000`.

## Research scope

Figures and `results-data.js` use the November 4, 2026 timing-normalized figure inputs. AbsRec@K counts correct abstention in the first K decision opportunities beginning when abstention becomes warranted. AbsRec@1 is timely recall; overall recall is a separate episode-budget statistic.

QA models use different evaluation coverage and should not be treated as a controlled leaderboard. CONVOLVE table values are reported from the manuscript on a separate 101-task WebShop abstention-only subset; they do not establish solvable-task completion performance. This website is a presentation of reported research, not a new model evaluation.

Visual styling follows the companion [HERA project website](https://hera-bench.github.io/).
