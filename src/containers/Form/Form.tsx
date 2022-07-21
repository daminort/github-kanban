import { FC, useCallback, useState, ChangeEvent, FormEvent } from 'react';
import Button from 'react-bootstrap/Button';
import LibForm from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { api } from 'api';
import { commonUtils } from 'utils/commonUtils';
import { useIssuesContext } from 'context';
import { useAuthToken } from 'hooks/useAuthToken';

const Form: FC = () => {

  const [url, setURL] = useState<string>('');
  const { refreshAll, refreshRepo } = useIssuesContext();

  const token = useAuthToken();

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setURL(event.target.value);
  }, []);

  const onSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault();
    const { owner, repoName } = commonUtils.parseURL(url);
    const { list, repo } = await api.getIssues(owner, repoName, token);

    const orderedList = commonUtils.restoreOrder(repo.repoURL, list);

    refreshAll(orderedList);
    refreshRepo(repo);
  }, [url, token, refreshAll, refreshRepo]);

  return (
    <LibForm onSubmit={onSubmit}>
      <Row>
        <Col xs={10}>
          <LibForm.Control
            type="text"
            placeholder="Enter repo URL"
            value={url}
            onChange={onChange}
          />
        </Col>
        <Col xs={2}>
          <Button variant="primary" type="submit" className="w-100">
            Load Issues
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="fs-6 text-muted mt-1 mx-1">
            <small>Please, enter the full URL of the repo. For example: <strong>https://github.com/nodejs/diagnostics</strong></small>
          </p>
        </Col>
      </Row>
    </LibForm>
  );
};

export {
  Form,
};
