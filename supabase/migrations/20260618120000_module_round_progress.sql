CREATE TABLE module_round_progress (
  user_id    uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_id  text        NOT NULL,
  seen_ids   text[]      NOT NULL DEFAULT '{}',
  round      integer     NOT NULL DEFAULT 1,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, module_id)
);

ALTER TABLE module_round_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own rows only" ON module_round_progress
  FOR ALL
  USING      (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
